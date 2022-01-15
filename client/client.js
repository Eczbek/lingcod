
import EventEmitter from './eventemitter.js';


export default class WebSocketClient extends EventEmitter {
	#socket;

	/**
	 * Attempts to connect socket to URL
	 * @param {string} url 
	 */
	connect (url) {
		this.#socket = new WebSocket(url);
		this.#socket.addEventListener('open', () => this.emit('open'));
		this.#socket.addEventListener('close', () => this.emit('close'));
		this.#socket.addEventListener('message', ({ data }) => this.emit('data', data));
	}

	/**
	 * Disconnects socket
	 */
	disconnect () {
		this.#socket?.close();
	}

	/**
	 * Sends data to server
	 * @param {Object} data 
	 */
	send (data) {
		this.#socket?.send(JSON.stringify(data));
	}

	/**
	 * Gets current URL
	 * @returns {string}
	 */
	getUrl () {
		return this.#socket?.url;
	}
}
