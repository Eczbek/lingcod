import { EventEmitter } from 'events';
import { createServer } from 'http';
import { randomUUID } from 'crypto';

import express from 'express';
import { WebSocketServer as InternalWebSocketServer } from 'ws';



export default class WebSocketServer extends EventEmitter {
	/**
	 * Creates and starts server
	 * @param {string} config optional
	 */
	constructor ({ CLIENT_DIR, PORT }) {
		super();

		this.use(CLIENT_DIR);
		this.port = PORT;
	}

	#app = express();
	#httpServer = createServer(this.#app);
	#webSocketServer = new InternalWebSocketServer({ server: this.#httpServer });
	port;
	sockets = [];


	/**
	 * Sets public directory
	 * @param {string} clientDir 
	 */
	use (clientDir) {
		if (!clientDir) {
			return;
		}
		this.#clientDir = clientDir;
		this.#app.use(express.static(clientDir));
	}


	/**
	 * Listens on port
	 * @param {number} port 
	 */
	listen (port = this.port) {
		if (!port) {
			return;
		}

		this.#httpServer.listen(port);

		this.#webSocketServer.on('connection', (sock) => {
			const id = randomUUID();
			this.sockets[id] = sock;
			this.emit('open', id);

			sock.on('close', () => {
				delete this.sockets[id];
				this.emit('close', id);
			});

			sock.on('message', (data) => {
				try {
					this.emit('data', id, JSON.parse(data));
				} catch {}
			});
		});
	}


	/**
	 * Sends data to websocket by ID
	 * @param {string} id 
	 * @param {object} data 
	 */
	send (id, data) {
		this.sockets[id]?.send(JSON.stringify(data));
	}


	/**
	 * Gets port
	 * @returns {number}
	 */
	getPort () {
		return this.#port;
	}
}