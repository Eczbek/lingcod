
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
export function isPrimitive (value) {
	return Object(value) !== value;
}

/**
 * Gets the type of value
 * @param {any} value 
 * @returns {string}
 */
export function typeOf (value) {
	return isNullish(value) ? String(value) : value?.constructor?.name ?? 'Object';
}

/**
 * Attempts to run function
 * @param {Function} callback 
 * @param  {...any} args 
 * @returns {any}
 */
export function attempt (callback, ...args) {
	try {
		return callback(...args);
	} catch {}
}

/**
 * Sleep
 * @param {number} millis 
 * @returns {Promise}
 */
export function sleep (millis) {
	return new Promise((resolve) => setTimeout(resolve, millis));
}
