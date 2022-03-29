
import { createReadStream } from 'fs';
import { join, parse } from 'path';
import { EventEmitter } from 'events';
import { randomUUID } from 'crypto';

import { WebSocketServer } from 'ws';


/**
 * Get path from URL
 * @param {string} url 
 * @returns {string}
 */
export function getURLPath (url) {
	return new URL(url, 'http://0.0.0.0').pathname;
}

/**
 * Listens and responds to server requests
 * @callback requestListener
 * @param {http.IncomingMessage}
 * @param {http.ServerResponse}
 */

/**
 * Creates a request listener
 * @param {string} servePath 
 * @param {boolean?} echo 
 * @returns {requestListener}
 */
export function createRequestListener (servePath, echo = false) {
	const { ext } = parse(servePath);
	return (request, response) => {
		if (echo && request.method === 'POST') return request.pipe(response);
		const readStream = createReadStream(ext ? servePath : join(servePath, getURLPath(request.url)))
			.on('error', () => response.end('404'))
			.on('open', () => readStream.pipe(response));
	};
}

/**
 * Sends message to socket by ID
 * @callback sendTo
 * @param {string} id 
 * @param {any} message 
 */

/**
 * Sends message to all sockets
 * @callback sendToAll
 * @param {any} message 
 */

/**
 * Creates a WebSocket server
 * @param {http.Server | https.Server} server 
 * @returns {{events: EventEmitter, sendTo, sendToAll}}
 */
export function createWebSocketServer (server) {
	const emitter = new EventEmitter();
	const sockets = Object.create(null);
	new WebSocketServer({ server })
		.on('connection', (socket) => {
			const id = randomUUID();
			sockets[id] = socket;
			emitter.emit('open', id);
			socket
				.on('close', () => {
					delete sockets[id];
					emitter.emit('close', id);
				})
				.on('message', (buffer) => {
					emitter.emit('data', id, buffer.toString());
					try {
						emitter.emit('json', id, JSON.parse(buffer));
					} catch {}
				});
		});
	return {
		events: emitter,
		sendTo: (id, message) => sockets[id].send(JSON.stringify(message)),
		sendToAll: (message) => {
			const data = JSON.stringify(message);
			Object.values(sockets).forEach((socket) => socket.send(data));
		}
	};
}
