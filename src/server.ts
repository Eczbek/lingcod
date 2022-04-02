
import { createReadStream } from 'fs';
import { join, parse } from 'path';
import { EventEmitter } from 'events';
import { randomUUID } from 'crypto';
import { IncomingMessage, ServerResponse } from 'http';

import { WebSocketServer, WebSocket } from 'ws';


export function getURLPath (url = '/'): string {
	return new URL(url, 'http://0.0.0.0').pathname;
}

export function createRequestListener(path: string, echo = false): (request: IncomingMessage, response: ServerResponse) => void {
	const { ext } = parse(path);
	return (request, response) => {
		if (echo && request.method === 'POST') return request.pipe(response);
		createReadStream(ext ? path : join(path, getURLPath(request.url)))
			.on('error', () => response.end('404'))
			.pipe(response);
	};
}

export function createWebSocketListener (webSocketServer: WebSocketServer): { events: EventEmitter, sendTo: (id: string, message: any) => void, sendToAll: (message: any) => void } {
	const emitter = new EventEmitter();
	const sockets = new Map();
	webSocketServer
		.on('connection', (socket: WebSocket) => {
			const id = randomUUID();
			sockets.set(id, socket);
			emitter.emit('open', id);
			socket
				.on('close', () => {
					sockets.delete(id);
					emitter.emit('close', id);
				})
				.on('message', (buffer: Buffer) => {
					const message = buffer.toString();
					emitter.emit('data', id, message);
					try {
						emitter.emit('json', id, JSON.parse(message));
					} catch {}
				});
		});
	return {
		events: emitter,
		sendTo: (id, message) => sockets.get(id)?.send(JSON.stringify(message)),
		sendToAll: (message) => {
			const data = JSON.stringify(message);
			[...sockets].forEach(([_, socket]) => socket.send(data));
		}
	};
}

export function createDatabaseAuth (setEntry: (username: string, password: string) => void, deleteEntry: (username: string) => void, getEntry: (username: string) => Object, checkUser: (username: string, password: string) => boolean): { isAuthed: (id: string) => boolean, create: (username: string, password: string) => Promise<boolean>, remove: (username: string, password: string) => Promise<boolean>, login: (id: string, username: string, password: string) => Promise<boolean>, logout: (id: string) => Promise<boolean> } {
	const authed = new Map();
	return {
		isAuthed: (id) => authed.has(id),
		create: async (username, password) => {
			if (await getEntry(username)) return false;
			await setEntry(username, password);
			return true;
		},
		remove: async (username, password) => {
			if (!await checkUser(username, password)) return false;
			await deleteEntry(username);
			return true;
		},
		login: async (id, username, password) => {
			if (authed.has(id) || !await checkUser(username, password)) return false;
			authed.set(id, username);
			return true;
		},
		logout: async (id) => {
			if (!authed.has(id)) return false;
			authed.delete(id);
			return true;
		}
	};
}
