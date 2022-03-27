
import { createServer } from 'http';
import { createReadStream } from 'fs';
import { join } from 'path';


export function createHTTPServer (servePath, port) {
	return createServer((request, response) => {
		if (request.url === '/') return request.pipe(response);
		const readStream = createReadStream(join(servePath, new URL(request.url, 'http://127.0.0.1').pathname))
			.on('error', () => response.end('404'))
			.on('open', () => readStream.pipe(response));
	}).listen(port);
}
