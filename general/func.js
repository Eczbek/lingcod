
/**
 * Throttles a function, only allows it to be called once per specified duration of time
 * @param {Function} callback 
 * @param {number} millis 
 * @returns {Function}
 */
export const throttle = (callback, millis) => {
	let last = 0;
	return (...args) => {
		if (Date.now() - last < millis) return;
		last = Date.now();
		callback(...args);
	}
};

/**
 * Debounces a function, only allows it to run when it has not been called for specified duration of time
 * @param {Function} callback 
 * @param {number} millis 
 * @returns {Function}
 */
export const debounce = (callback, millis) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), millis);
	}
}
