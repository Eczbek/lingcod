
import { createTimeFormat } from './time.js';


export default class Logger {
	#id;
	#timers = new Map();
	#format;

	constructor (id, timeFormat = createTimeFormat('%Y-%M-%D %H:%m:%S:%s')) {
		this.#id = id;
		this.#format = timeFormat;
	}

	getId = () => this.#id;

	log = (data, tag = 'log') => console.log(`[${this.#format(new Date(), true)}] ${this.#id} (${tag.toUpperCase()}) `, data);

	addTimer = (id) => {
		this.#timers.set(id, Date.now());
	}

	endTimer = (id) => {
		if (!this.#timers.has(id)) return;
		const diff = Date.now() - this.#timers.get(id);
		this.log(`${id}: ${diff} ms`, 'timer');
		this.#timers.delete(id);
		return diff;
	}
}
