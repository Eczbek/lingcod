
export const throttle = (callback, wait = 1000) => {
	let last = 0;
	return (...args) => {
		if (Date.now() - last < wait) return;
		last = Date.now();
		callback(...args);
	}
};

export function debounce (callback, millis = 1000) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), millis);
	}
}
