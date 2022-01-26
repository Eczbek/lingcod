
class WebSocketClient extends EventEmitter {
	#socket;
	#url;

	connect = (url = this.#url) => {
		this.#url = url;
		this.#socket = new WebSocket(this.#url);
		this.#socket.addEventListener('open', () => this.emit('open'));
		this.#socket.addEventListener('close', () => this.emit('close'));
		this.#socket.addEventListener('message', ({ data }) => this.emit('data', data));
	}

	disconnect = () => this.#socket?.close();

	send = (data) => this.#socket?.send(JSON.stringify(data));

	getURL = () => this.#url;
}
