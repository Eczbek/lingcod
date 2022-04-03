
import { createReadStream } from 'fs';
import { join, parse } from 'path';
import { EventEmitter } from 'events';
import { randomUUID } from 'crypto';
import { readdir, readFile } from 'fs/promises';
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

export function createWebSocketListener (webSocketServer: WebSocketServer) {
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
		sendTo: (id: string, message: any) => sockets.get(id)?.send(JSON.stringify(message)),
		sendToAll: (message: any) => {
			const data = JSON.stringify(message);
			[...sockets].forEach(([_, socket]) => socket.send(data));
		},
		sendAs: (id: string, message: any) => sockets.get(id)?.emit('message', JSON.stringify(message))
	};
}

export function createDatabaseAuth (addUser: (username: string, password: string) => void, deleteUser: (username: string) => void, getUser: (username: string) => Object, checkUser: (username: string, password: string) => boolean) {
	const authed = new Map();
	return {
		getAuthed: () => new Map(authed),
		create: async (username: string, password: string) => {
			if (await getUser(username)) return false;
			await addUser(username, password);
			return true;
		},
		remove: async (username: string, password: string) => {
			if (!await checkUser(username, password)) return false;
			await deleteUser(username);
			return true;
		},
		login: async (id: string, username: string, password: string) => {
			if (!await checkUser(username, password)) return false;
			authed.set(id, username);
			return true;
		},
		logout: async (id: string) => {
			if (!authed.has(id)) return false;
			authed.delete(id);
			return true;
		}
	};
}

export async function parseJSONDir (path: string) {
	return Object.fromEntries(await Promise.all((await readdir(path)).map(async (file) => [file.match(/\w+/)?.[0], JSON.parse(((await readFile(join(path, file))).toString()))])))
}
