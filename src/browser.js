
class MinimalEventEmitter extends EventTarget {
	#callbacks = {};

	emit (id, ...data) {
		this.dispatchEvent(new CustomEvent(id, { detail: data }));
		return this;
	}

	on (id, callback) {
		this.#callbacks[id] = ({ detail }) => callback(...detail);
		this.addEventListener(id, this.#callbacks[id]);
		return this;
	}

	off (id) {
		this.removeEventListener(id, this.#callbacks[id]);
		delete this.#callbacks[id];
		return this;
	}

	once (id, callback) {
		return this.on(id, (...args) => {
			this.off(id);
			callback(...args);
		});
	}
}

class MinimalWebSocketClient extends MinimalEventEmitter {
	constructor (protocol = 'ws') {
		super();
		this.protocol = protocol;
	}

	protocol;
	#socket;
	reconnectTimeout = 15000;

	connect (url) {
		this.#socket = new WebSocket(url.replace(/^(.*:\/\/)?/, this.protocol + '://'));
		this.#socket.addEventListener('open', () => this.emit('open'));
		this.#socket.addEventListener('close', () => {
			if (this.reconnectTimeout) setTimeout(() => this.connect(this.getURL()), this.reconnectTimeout);
			this.emit('close');
		});
		this.#socket.addEventListener('message', ({ data }) => {
			this.emit('data', data);
			try {
				this.emit('json', JSON.parse(data));
			} catch {}
		});
		this.#socket.addEventListener('error', (error) => this.emit('error', error));

		return this;
	}

	disconnect (code, reason) {
		this.#socket?.close(code, reason);
		return this;
	}

	send (message) {
		this.#socket?.send(JSON.stringify(message));
		return this;
	}

	getURL () {
		return this.#socket?.url;
	}
}

function download (filename, data, type = 'text') {
	const link = document.createElement('a');
	link.download = filename;
	link.href = URL.createObjectURL(new Blob([data], { type }));
	link.click();
}

function animate (callback) {
	function step () {
		callback();
		requestAnimationFrame(step);
	}
	requestAnimationFrame(step);
}

function getCookiesObject () {
	return Object.fromEntries(document.cookie.split(';').map((entry) => entry.split('=')));
}
