
/**
 * Check if value is iterable
 * @param {any} value 
 * @returns {boolean}
 */
export function isIterable (value) {
	return typeOf(value?.[Symbol.iterator]) === 'Function';
}

/**
 * Check if value is nullish
 * @param {any} value 
 * @returns {boolean}
 */
export function isNullish (value) {
	return value == null;
}

/**
 * Check if value is primitive
 * @param {any} value 
 * @returns {boolean}
 */
export function isPrimitive (value) {
	return Object(value) !== value;
}

/**
 * Get the type of a value
 * @param {any} value 
 * @returns {string}
 */
export function typeOf (value) {
	return isNullish(value) ? String(value) : value?.constructor?.name ?? 'Object';
}

/**
 * Attempt to run function
 * @param {Function} callback 
 * @param {any} otherwise  
 * @returns {any}
 */
export function attempt (callback, otherwise) {
	try {
		return callback();
	} catch {
		return otherwise;
	}
}

/**
 * Sleep
 * @param {number} millis 
 * @returns {Promise}
 */
export function sleep (millis) {
	return new Promise((resolve) => setTimeout(resolve, millis));
}
