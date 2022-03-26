
export function throttle (callback, millis) {
	let last = 0;
	return (...args) => {
		if (Date.now() - last < millis) return;
		last = Date.now();
		callback(...args);
	}
};

export function debounce (callback, millis) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), millis);
	}
}
