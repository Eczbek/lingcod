
class MinimalEventEmitter extends EventTarget {
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

function download (filename, data, type = 'text') {
	const link = document.createElement('a');
	link.download = filename;
	link.href = URL.createObjectURL(new Blob([data], { type }));
	link.click();
}

function animate (callback) {
	function step () {
		callback();
		requestAnimationFrame(step);
	}
	requestAnimationFrame(step);
}

function cookieToObject () {
	return Object.fromEntries(document.cookie.split(';').map((entry) => entry.split('=')));
}
