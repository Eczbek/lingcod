
class EventEmitter extends EventTarget {
	#funcs = {};

	/**
	 * Emits event with data
	 * @param {string} id 
	 * @param  {...any} data 
	 */
	emit (id, ...data) {
		this.dispatchEvent(new CustomEvent(id, { detail: data }));
	}

	/**
	 * Creates event listener, executes callback when event is emitted
	 * @param {string} id 
	 * @param {Function} callback 
	 */
	on (id, callback) {
		this.#funcs[id] = ({ detail }) => callback(...detail);
		this.addEventListener(id, this.#funcs[id]);
	}

	/**
	 * Removes event listener
	 * @param {string} id 
	 */
	off (id) {
		this.removeEventListener(id, this.#funcs[id]);
		delete this.#funcs[id];
	}

	/**
	 * Executes callback when event is emitted, then removes event listener
	 * @param {string} id 
	 * @param {Function} callback 
	 */
	once (id, callback) {
		this.on(id, (...args) => {
			this.off(id);
			callback(...args);
		});
	}
}
