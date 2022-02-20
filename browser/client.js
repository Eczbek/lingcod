
class WebSocketClient extends EventEmitter {
	#socket;

	connect (url = this.getURL()) {
		this.#socket = new WebSocket(url);
		this.#socket.addEventListener('open', () => this.emit('open'));
		this.#socket.addEventListener('close', () => this.emit('close'));
		this.#socket.addEventListener('message', ({ data }) => this.emit('data', data));
	}

	disconnect () {
		this.#socket?.close();
	}

	send (data) {
		this.#socket?.send(JSON.stringify(data));
	}

	getURL () {
		return this.#socket?.url;
	}
}
