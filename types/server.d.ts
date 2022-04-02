/// <reference types="node" />
import { EventEmitter } from 'events';
import { IncomingMessage, ServerResponse } from 'http';
import { WebSocketServer } from 'ws';
export declare function getURLPath(url?: string): string;
export declare function createRequestListener(path: string, echo?: boolean): (request: IncomingMessage, response: ServerResponse) => void;
export declare function createWebSocketListener(webSocketServer: WebSocketServer): {
    events: EventEmitter;
    sendTo: (id: string, message: any) => void;
    sendToAll: (message: any) => void;
};
export declare function createDatabaseAuth(setEntry: (username: string, password: string) => void, deleteEntry: (username: string) => void, getEntry: (username: string) => Object, checkUser: (username: string, password: string) => boolean): {
    isAuthed: (id: string) => boolean;
    create: (username: string, password: string) => Promise<boolean>;
    remove: (username: string, password: string) => Promise<boolean>;
    login: (id: string, username: string, password: string) => Promise<boolean>;
    logout: (id: string) => Promise<boolean>;
};
