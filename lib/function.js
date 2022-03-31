
/**
 * @typedef throttled
 * @type {Function}
 * @property {() => Function} unthrottle
 */

/**
 * Only allow callback to be called once per assigned time
 * @param {Function} callback 
 * @param {number} millis 
 * @returns {throttled}
 */
export function throttle (callback, millis) {
	let last = 0;
	const throttled = (...args) => {
		if (Date.now() - last < millis) return;
		last = Date.now();
		callback(...args);
	};
	throttled.unthrottle = () => callback;
	return throttled;
};

/**
 * Debounced function
 * @typedef debounced
 * @type {Function}
 * @property {() => void} cancel 
 */

/**
 * Only allows function to execute after isn't called for specified time
 * @param {Function} callback 
 * @param {number} millis 
 * @returns {debounced}
 */
export function debounce (callback, millis) {
	let timer;
	const debounced = (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), millis);
	};
	debounced.cancel = () => clearTimeout(timer);
	return debounced;
}

/**
 * Call each callback in order with the previous' result
 * @param  {...Function} callbacks 
 * @returns {(...args: any[]) => any}
 */
export function chain (...callbacks) {
	return (...args) => callbacks.slice(1).reduce((value, callback) => callback(value), callbacks[0](...args));
}
