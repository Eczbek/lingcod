
import { EventEmitter } from 'events';
import { createServer } from 'http';
import { randomUUID } from 'crypto';

import express from 'express';
import { WebSocketServer } from 'ws';


export default class ExpressWebSocketServer extends EventEmitter {
	sockets = {};
	clients = {};

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
					delete this.clients[this.sockets[id].username];
					delete this.sockets[id];
					this.emit('close', id);
				});
	});

	/**
	 * Allows directory to be accessed by client
	 * @param {string} path 
	 */
	use (path) {
		this.#expressApp.use(express.static(path));
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

	/**
	 * Adds client to ID by username
	 * @param {string} id 
	 * @param {string} username 
	 */
	addClient (id, username) {
		this.clients[username] = id;
		this.sockets[id].username = username;
	};

	/**
	 * Removes client by username
	 * @param {string} username 
	 */
	removeClient (username) {
		delete this.clients[username];
		delete this.sockets[id].username;
	}

	/**
	 * Sends data to client by username
	 * @param {string} username 
	 * @param {any} data 
	 */
	message (username, data) {
		this.send(this.clients[username], data);
	}

	/**
	 * Sends data to all clients
	 * @param {any} data 
	 */
	broadcast (data) {
		Object.values(this.clients).forEach((id) => this.send(id, data));
	}

	/**
	 * Kicks client by username
	 * @param {string} username 
	 */
	kick (username) {
		this.close(this.clients[username]);
	}
}
