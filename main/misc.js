
/**
 * Gets the class/type of a value
 * @param {any} value 
 * @returns {string}
 */
export function typeOf (value) {
	return String(value?.constructor?.name);
}

/**
 * Checks if value is iterable
 * @param {any} value 
 * @returns {boolean}
 */
export function isIterable (value) {
	return typeOf(value?.[Symbol.iterator]) === 'Function';
}

/**
 * Checks if value is nullish
 * @param {any} value 
 * @returns {boolean}
 */
export function isNullish (value) {
	return value == null;
}

/**
 * Checks if value is primitive
 * @param {any} value 
 * @returns {boolean}
 */
export function isPrimitive  (value) {
	return Object(value) !== value;
}

/**
 * Attempts to run function
 * @param {Function} callback 
 * @param {any} other 
 * @param  {...any} args 
 * @returns {any}
 */
export function attempt (callback, other, ...args) {
	try {
		return callback(...args);
	} catch {
		return other;
	}
}

/**
 * No-operation
 */
export function noop () {}

/**
 * Returns promise with delay
 * @param {number} delay 
 * @returns {Promise}
 */
export function sleep (delay) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}
