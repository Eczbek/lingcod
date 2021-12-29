export default class EventEmitter extends EventTarget {
	/**
	 * @param {string} id 
	 * @param  {...any} data 
	 */
	emit (id, ...data) {
		this.dispatchEvent(new CustomEvent(id, { detail: data }));
	}


	/**
	 * @param {string} id 
	 * @param {Function} callback 
	 */
	on (id, callback) {
		this.addEventListener(id, ({ detail }) => callback(...detail));
	}
}
