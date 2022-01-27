
class WebSocketClient extends EventEmitter {
	#socket;

	/**
	 * Creates WebSocket connection to URL, or reconnects to previous URL
	 * @param {string} url 
	 */
	connect (url = this.getURL()) {
		this.#socket = new WebSocket(url);
		this.#socket.addEventListener('open', () => this.emit('open'));
		this.#socket.addEventListener('close', () => this.emit('close'));
		this.#socket.addEventListener('message', ({ data }) => this.emit('data', data));
	}

	/**
	 * Closes WebSocket connection
	 */
	disconnect () {
		this.#socket?.close();
	}

	/**
	 * Sends data by WebSocket, must be stringifiable
	 * @param {any} data 
	 */
	send (data) {
		this.#socket?.send(JSON.stringify(data));
	}

	/**
	 * Gets current URL
	 * @returns {string}
	 */
	getURL () {
		return this.#socket?.url;
	}
}
