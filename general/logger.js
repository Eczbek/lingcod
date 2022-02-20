
export default class Logger {
	#id;
	#timers = {};

	constructor (id) {
		this.#id = id;
	}

	getId () {
		return this.#id;
	}

	log (data, tag = 'log') {
		console.log(`[${new Date().toISOString()}] ${this.#id} (${tag.toUpperCase()}) `, data);
	}

	addTimer (id) {
		this.#timers.set(id, Date.now());
	}

	endTimer (id) {
		if (!this.#timers[id]) return;
		const diff = Date.now() - this.#timers[id];
		delete this.#timers[id];
		this.log(`${id}: ${diff} ms`, 'timer');
		return diff;
	}
}
