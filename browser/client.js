
class WebSocketClient extends EventEmitter {
	#socket;
	#url;

	connect = (host = 'localhost', port = 8080, secure = false) => {
		this.#url = `${secure ? 'wss' : 'ws'}://${host}:${port}`;
		this.#socket = new WebSocket(this.#url);
		this.#socket.addEventListener('open', () => this.emit('open'));
		this.#socket.addEventListener('close', () => this.emit('close'));
		this.#socket.addEventListener('message', ({ data }) => this.emit('data', data));
	}

	disconnect = () => {
		this.#socket?.close();
	}

	send = (data) => {
		this.#socket?.send(JSON.stringify(data));
	}

	getURL = () => {
		return this.#url;
	}
}
