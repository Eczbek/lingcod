
class EventEmitter extends EventTarget {
	#callbacks = {};

	emit (id, ...data) {
		this.dispatchEvent(new CustomEvent(id, { detail: data }));
		return this;
	}

	on (id, callback) {
		this.#callbacks[id] = ({ detail }) => callback(...detail);
		this.addEventListener(id, this.#callbacks[id]);
		return this;
	}

	off (id) {
		this.removeEventListener(id, this.#callbacks[id]);
		delete this.#callbacks[id];
		return this;
	}

	once (id, callback) {
		return this.on(id, (...args) => {
			this.off(id);
			callback(...args);
		});
	}
}
