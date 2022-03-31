
import { MinimalEventEmitter } from './misc.js';


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
	 * Attempts to connect to a WebSocket server
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
	 * Disconnects from WebSocket server
	 * @param {number} code 
	 * @param {string} reason 
	 * @returns {this}
	 */
	disconnect (code, reason) {
		this.#socket?.close(code, reason);
		return this;
	}

	/**
	 * Sends message to current WebSocket server
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
