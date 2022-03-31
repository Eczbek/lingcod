
/**
 * Download data to file
 * @param {any} data 
 * @param {string} filename 
 * @param {string} type 
 */
 export function download (data, filename, type = 'text') {
	const link = document.createElement('a');
	link.download = filename;
	link.href = URL.createObjectURL(new Blob([data], { type }));
	link.click();
}

/**
 * Get this document's cookies
 * @returns {Object}
 */
export function getCookiesObject () {
	return Object.fromEntries(document.cookie.split(';').map((entry) => entry.split('=')));
}

export class MinimalEventEmitter extends EventTarget {
	#callbacks = {};

	/**
	 * Emit an event
	 * @param {string} id 
	 * @param  {...any} data 
	 * @returns {this}
	 */
	emit (id, ...data) {
		this.dispatchEvent(new CustomEvent(id, { detail: data }));
		return this;
	}

	/**
	 * Called when an event with this ID is emitted
	 * @param {string} id 
	 * @param {Function} callback 
	 * @returns {this}
	 */
	on (id, callback) {
		this.#callbacks[id] = ({ detail }) => callback(...detail);
		this.addEventListener(id, this.#callbacks[id]);
		return this;
	}

	/**
	 * Remove the event listener with this ID
	 * @param {string} id 
	 * @returns {this}
	 */
	off (id) {
		this.removeEventListener(id, this.#callbacks[id]);
		delete this.#callbacks[id];
		return this;
	}

	/**
	 * Only called once
	 * @param {string} id 
	 * @param {Function} callback 
	 * @returns {this}
	 */
	once (id, callback) {
		return this.on(id, (...args) => {
			this.off(id);
			callback(...args);
		});
	}
}
