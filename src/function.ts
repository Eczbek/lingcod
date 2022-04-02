
export function throttle (callback: Function, millis: number) {
	let last = 0;
	return (...args: any[]): void => {
		if (Date.now() - last < millis) return;
		last = Date.now();
		callback(...args);
	};
}

export function debounce (callback: Function, millis: number) {
	let timer: any;
	const debounced = (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), millis);
	};
	debounced.cancel = () => clearTimeout(timer);
	return debounced;
}

export function chain (...callbacks: Function[]) {
	return async (...args: any[]) => callbacks.slice(1).reduce(async (value, callback) => await callback(value), await callbacks[0](...args));
}
