class WebSocketClient extends EventEmitter {
	constructor (url) {
		super();

		if (url) {
			this.connect(url);
		}
	}

	#socket;


	/**
	 * Connects to server by url
	 * @param {string} url 
	 */
	connect (url) {
		this.#socket = new WebSocket(url);
		
		this.#socket.addEventListener('open', () => this.emit('open'));
		this.#socket.addEventListener('close', () => this.emit('close'));
		this.#socket.addEventListener('message', ({ data }) => this.emit('data', data));
	}


	/**
	 * Sends data to server
	 * @param {object} data 
	 */
	send (data) {
		this.#socket.send(JSON.stringify(data));
	}
}