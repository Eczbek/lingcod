
class EventEmitter extends EventTarget {
	#funcs = {};

	emit = (id, ...data) => this.dispatchEvent(new CustomEvent(id, { detail: data }));

	on = (id, callback) => {
		this.#funcs[id] = ({ detail }) => callback(...detail);
		this.addEventListener(id, this.#funcs[id]);
	}

	off = (id) => {
		this.removeEventListener(id, this.#funcs[id]);
		delete this.#funcs[id];
	}

	once = (id, callback) => this.on(id, (...args) => {
		this.off(id);
		callback(...args);
	});
}
