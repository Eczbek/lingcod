
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
 * Creates a request listener
 * @param {string} servePath 
 * @param {boolean} echo 
 * @returns {(request: http.IncomingMessage, response: http.ServerResponse) => void}
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
 * Creates a WebSocket server
 * @param {http.Server | https.Server} server 
 * @returns {{events: EventEmitter, sendTo: (id: string, message: any) => void, sendToAll: (message: any) => void}}
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

/**
 * Creates database authentication methods
 * @param {(username: string, password: string) => void} setEntry 
 * @param {(username: string) => void} deleteEntry 
 * @param {(username: string) => Object} getEntry 
 * @param {(username: string, password: string) => boolean} checkUser 
 * @returns {{isAuthed: (id: string) => boolean, create: (username: string, password: string) => boolean, remove: (username: string, password: string) => boolean, login: (id: string, username: string, password: string) => boolean, logout: (id: string) => boolean}}
 */
export function createDatabaseAuth (setEntry, deleteEntry, getEntry, checkUser) {
	const authed = Object.create(null);
	return {
		isAuthed: (id) => Object.hasOwn(authed, id),
		create: async ({ username, password }) => {
			if (await getEntry(username)) return false;
			await setEntry(username, password);
			return true;
		},
		remove: async ({ username, password }) => {
			if (!await checkUser(username, password)) return false;
			await deleteEntry(username);
			return true;
		},
		login: async ({ id, username, password }) => {
			if (!await checkUser(username, password)) return false;
			authed[id] = username;
			return true;
		},
		logout: async ({ id }) => {
			if (!Object.hasOwn(authed, id)) return false;
			delete authed[id];
			return true;
		}
	};
}
