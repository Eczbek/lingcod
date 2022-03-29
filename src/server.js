
import { createReadStream } from 'fs';
import { join, parse } from 'path';
import { EventEmitter } from 'events';
import { randomUUID } from 'crypto';

import { WebSocketServer } from 'ws';


export function getURLPath (url) {
	return new URL(url, 'http://0.0.0.0').pathname;
}

export function createRequestListener (servePath, echo = false) {
	const { ext } = parse(servePath);
	return (request, response) => {
		if (echo && request.method === 'POST') return request.pipe(response);
		const readStream = createReadStream(ext ? servePath : join(servePath, getURLPath(request.url)))
			.on('error', () => response.end('404'))
			.on('open', () => readStream.pipe(response));
	};
}

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
