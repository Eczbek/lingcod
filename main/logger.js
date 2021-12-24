import { formatTime } from './time.js';



export default class Logger {
	/**
	 * Creates logger with ID
	 * @param {string} id 
	 */
	constructor (id) {
		this.#id = id;
	}

	#id;
	#timers = new Map();

	/**
	 * Gets logger ID
	 * @returns {string}
	 */
	getId () {
		return this.#id;
	}

	/**
	 * Gets logger timers
	 * @returns {Map}
	 */
	getTimers () {
		return this.#timers;
	}

	/**
	 * Logs data with tag to console
	 * @param {any} data 
	 * @param {string} tag 
	 */
	log (data, tag = 'log') {
		console.log(`[${formatTime('$year-$mon-$date $hour:$min:$sec:$ms')}] ${this.#id} (${tag.toUpperCase()}) ${data}`);
	}

	/**
	 * Same as log, but with specified tag
	 * @param {any} data 
	 */
	debug (data) {
		this.log(data, 'debug')
	}

	/**
	 * Same as log, but with specified tag
	 * @param {any} data 
	 */
	warn (data) {
		this.log(data, 'warn');
	}

	/**
	 * Same as log, but with specified tag
	 * @param {any} data 
	 */
	error (data) {
		this.log(data, 'error')
	}

	/**
	 * Creates a new timer with ID
	 * @param {string} id 
	 */
	timeStart (id) {
		this.#timers.set(id, new Date().getTime());
		this.log(`started ${id}`, 'timer');
	}

	/**
	 * Stops timer by ID, logs difference
	 * @param {string} id 
	 */
	timeEnd (id) {
		if (!this.#timers.has(id)) {
			return;
		}
		this.log(`ended ${id}, difference: ${new Date().getTime() - this.#timers.get(id)} ms`, 'timer');
		this.#timers.delete(id);
	}
}