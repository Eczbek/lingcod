import { EventEmitter } from 'events';
import { createServer } from 'http';
import { randomUUID } from 'crypto';

import express from 'express';
import { WebSocketServer as _WebSocketServer } from 'ws';



export default class WebSocketServer extends EventEmitter {
	#expressApp = express();
	#httpServer = createServer(this.#expressApp);
	#webSocketServer = new _WebSocketServer({ server: this.#httpServer });
	port;
	sockets = {};


	/**
	 * Adds usable public directory
	 * @param {string} clientDir 
	 */
	use (dir) {
		if (dir) this.#expressApp.use(express.static(dir));
	}


	/**
	 * Listens on port
	 * @param {number} port 
	 */
	listen (port) {
		this.port = port;
		this.#httpServer.listen(port);
		this.#webSocketServer.on('connection', (sock) => {
			const id = randomUUID();
			this.sockets[id] = sock;
			this.emit('open', id);
			sock.on('close', () => {
				delete this.sockets[id];
				this.emit('close', id);
			});
			sock.on('message', (buffer) => {
				try {
					this.emit('data', id, JSON.parse(buffer));
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
		try {
			this.sockets[id].send(JSON.stringify(data));
		} catch {}
	}
}