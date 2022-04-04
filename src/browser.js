
/**
 * Download data to file
 * @param {any} data 
 * @param {string} filename 
 * @param {string} type 
 */
 export function download (data, filename, type = 'text') {
	const link = document.createElement('a');
	link.download = filename;
	link.href = URL.createObjectURL(new Blob([data], { type }));
	link.click();
}

/**
 * Get this document's cookies
 * @returns {Object}
 */
export function getCookiesObject () {
	return Object.fromEntries(document.cookie.split(';').map((entry) => entry.split('=')));
}

export class MinimalEventEmitter extends EventTarget {
	#callbacks = {};

	/**
	 * Emit an event
	 * @param {string} id 
	 * @param  {...any} data 
	 * @returns {this}
	 */
	emit (id, ...data) {
		this.dispatchEvent(new CustomEvent(id, { detail: data }));
		return this;
	}

	/**
	 * Called when an event with this ID is emitted
	 * @param {string} id 
	 * @param {Function} callback 
	 * @returns {this}
	 */
	on (id, callback) {
		this.#callbacks[id] = ({ detail }) => callback(...detail);
		this.addEventListener(id, this.#callbacks[id]);
		return this;
	}

	/**
	 * Remove the event listener with this ID
	 * @param {string} id 
	 * @returns {this}
	 */
	off (id) {
		this.removeEventListener(id, this.#callbacks[id]);
		delete this.#callbacks[id];
		return this;
	}

	/**
	 * Only called once
	 * @param {string} id 
	 * @param {Function} callback 
	 * @returns {this}
	 */
	once (id, callback) {
		return this.on(id, (...args) => {
			this.off(id);
			callback(...args);
		});
	}
}

export class WebSocketClient extends MinimalEventEmitter {
	/**
	 * Create new minimal WebSocket client
	 * @param {string} protocol 
	 */
	constructor (protocol = 'ws') {
		super();
		this.protocol = protocol;
	}

	protocol;
	#socket;
	reconnectTimeout = 15000;

	/**
	 * Attempt to connect to a WebSocket server
	 * @param {string} url 
	 * @returns {this}
	 */
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

	/**
	 * Disconnect from WebSocket server
	 * @param {number} code 
	 * @param {string} reason 
	 * @returns {this}
	 */
	disconnect (code, reason) {
		this.#socket?.close(code, reason);
		return this;
	}

	/**
	 * Send a JSON.stringify-able message
	 * @param {any} message 
	 * @returns {this}
	 */
	send (message) {
		this.#socket?.send(JSON.stringify(message));
		return this;
	}

	/**
	 * Get current URL
	 * @returns {string}
	 */
	getURL () {
		return this.#socket?.url;
	}
}
