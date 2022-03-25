
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
