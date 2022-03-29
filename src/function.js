
/**
 * Returns unthrottled function
 * @callback unthrottleThrottled
 * @returns {Function}
 */

/**
 * Throttled function
 * @typedef throttled
 * @type {Function}
 * @property {unthrottleThrottled} unthrottle
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
 * Cancels debounced function
 * @callback cancelDebounced
 */

/**
 * Debounced function
 * @typedef debounced
 * @type {Function}
 * @property {cancelDebounced} cancel 
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
