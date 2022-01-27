export default class Logger {
	#id;
	#timers = {};

	/**
	 * Creates logger with ID
	 * @param {string} id 
	 */
	constructor (id) {
		this.#id = id;
	}

	/**
	 * Gets logger ID
	 * @returns {string}
	 */
	getId () {
		return this.#id;
	}

	/**
	 * Logs data to console, with current ISO time, logger ID, and tag
	 * @param {any} data 
	 * @param {string} tag optional parameter
	 */
	log (data, tag = 'log') {
		console.log(`[${new Date().toISOString()}] ${this.#id} (${tag.toUpperCase()}) `, data);
	}

	/**
	 * Adds a timer
	 * @param {string} id 
	 */
	addTimer (id) {
		this.#timers.set(id, Date.now());
	}

	/**
	 * Ends timer, logs and returns difference
	 * @param {string} id 
	 * @returns {number}
	 */
	endTimer (id) {
		if (!this.#timers[id]) return;
		const diff = Date.now() - this.#timers[id];
		delete this.#timers[id];
		this.log(`${id}: ${diff} ms`, 'timer');
		return diff;
	}
}
