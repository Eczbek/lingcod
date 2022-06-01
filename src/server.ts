
import { join } from 'node:path';
import { EventEmitter } from 'node:events';
import { randomUUID } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { WebSocketServer, WebSocket } from 'ws';


export function getURLPath (url = '/'): string {
	return new URL(url, 'a://0.0.0.0').pathname;
}

export function createWebSocketListener(webSocketServer: WebSocketServer): {
	events: EventEmitter,
	sendTo: (id: string, message: any) => void,
	sendToAll: (message: any) => void,
	sendAs: (id: string, message: any) => void
} {
	const emitter = new EventEmitter();
	const sockets = new Map();
	webSocketServer.on('connection', (socket: WebSocket) => {
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

export function createDatabaseAuth(addUser: (username: string, password: string) => void, deleteUser: (username: string) => void, getUser: (username: string) => Object, checkUser: (username: string, password: string) => boolean): {
	getAuthed: () => Map<string, string>,
	create: (username: string, password: string) => Promise<boolean>,
	remove: (username: string, password: string) => Promise<boolean>,
	login: (id: string, username: string, password: string) => Promise<boolean>,
	logout: (id: string) => Promise<boolean>
} {
	const authed = new Map();
	return {
		getAuthed: () => new Map(authed),
		create: async (username: string, password: string) => {
			if (await getUser(username))
				return false;
			await addUser(username, password);
			return true;
		},
		remove: async (username: string, password: string) => {
			if (!await checkUser(username, password))
				return false;
			await deleteUser(username);
			return true;
		},
		login: async (id: string, username: string, password: string) => {
			if (!await checkUser(username, password))
				return false;
			authed.set(id, username);
			return true;
		},
		logout: async (id: string) => {
			if (!authed.has(id))
				return false;
			authed.delete(id);
			return true;
		}
	};
}

export async function parseJSONDir(path: string): Promise<Object> {
	return Object.fromEntries(await Promise.all((await readdir(path)).map(async (file) => [file.match(/\w+/)?.[0], JSON.parse(((await readFile(join(path, file))).toString()))])))
}
