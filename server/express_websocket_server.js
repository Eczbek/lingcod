
import { EventEmitter } from 'events';
import { createServer as createHTTPServer } from 'http';
import { randomUUID as createRandomUUID } from 'crypto';

import express from 'express';
import { WebSocketServer } from 'ws';


export default class ExpressWebSocketServer extends EventEmitter {
	#expressApp = express();
	#httpServer = createHTTPServer(this.#expressApp);
	#webSocketServer = new WebSocketServer({ server: this.#httpServer });
	sockets = {};

	/**
	 * Adds usable public directory
	 * @param {string} directory 
	 */
	use (directory) {
		this.#expressApp.use(express.static(directory));
	}

	/**
	 * Listens on port
	 * @param {number} port 
	 */
	listen (port) {
		this.#httpServer.listen(port);
		this.#webSocketServer.on('connection', (socket) => {
			const id = createRandomUUID();
			this.sockets[id] = socket;
			console.log(`${id} connected`);
			this.emit('open', id);
			socket.on('close', () => {
				delete this.sockets[id];
				console.log(`${id} disconnected`);
				this.emit('close', id);
			}).on('message', (buffer) => {
				try {
					const data = JSON.parse(buffer);
					console.log(`${id} says ${JSON.stringify(data)}`);
					this.emit('data', id, data);
				} catch {}
			});
		});
		console.log(`server started on port ${port}`);
	}

	/**
	 * Sends data to WebSocket by ID
	 * @param {string} id 
	 * @param {Object} data 
	 */
	send (id, data) {
		this.sockets[id].send(JSON.stringify(data));
		console.log(`${id} to receive ${JSON.stringify(data)}`);
	}

	/**
	 * Sends data to all WebSockets
	 * @param {Object} data 
	 */
	broadcast (data) {
		Object.values(this.sockets).forEach((socket) => this.send(socket, data));
	}

	/**
	 * Disconnects WebSockets by ID
	 * @param {string} id 
	 * @param {number} timeout 
	 */
	kick (id, timeout = 10000) {
		this.sockets[id].close();
		setTimeout(() => this.sockets[id].terminate(), timeout);
		console.log(`${id} was kicked`);
	}

	/**
	 * Gets server port
	 * @returns {number}
	 */
	getPort () {
		return this.#httpServer.address().port;
	}
}
