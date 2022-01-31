
import { EventEmitter } from 'events';
import { createServer } from 'http';
import { randomUUID } from 'crypto';

import express from 'express';
import { WebSocketServer } from 'ws';


export default class ExpressWebSocketServer extends EventEmitter {
	sockets = {};

	#expressApp = express();
	#httpServer = createServer(this.#expressApp);
	#webSocketServer = new WebSocketServer({ server: this.#httpServer })
		.on('connection', (sock) => {
			const id = randomUUID();
			this.sockets[id] = sock;
			this.emit('open', id);

			sock
				.on('message', (buffer) => {
					try {
						this.emit('data', id, JSON.parse(buffer));
					} catch {}
				})
				.on('close', () => {
					delete this.sockets[id];
					this.emit('close', id);
				});
	});

	/**
	 * Allows directory to be accessed by client
	 * @param {Array<string> | string} dirs 
	 */
	use (dirs) {
		(dirs?.constructor?.name === 'Array' ? dirs : [dirs]).forEach((dir) => this.#expressApp.use(express.static(dir)));
	}

	/**
	 * Server listens on port
	 * @param {number} port 
	 */
	listen (port) {
		this.#httpServer.listen(port);
	};

	/**
	 * Gets current port
	 * @returns {number}
	 */
	getPort () {
		return this.#httpServer.address().port;
	}

	/**
	 * Sends data to WebSocket by ID
	 * @param {string} id 
	 * @param {any} data 
	 */
	send (id, data) {
		this.sockets[id].send(JSON.stringify(data));
	}

	/**
	 * Closes WebSocket connection by ID
	 * @param {string} id 
	 */
	close (id) {
		this.sockets[id].close();
	}
}
