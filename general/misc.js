
/**
 * Gets the type of value
 * @param {any} value 
 * @returns {string}
 */
export const typeOf = (value) => String(value?.constructor?.name);

/**
 * Checks if value is iterable
 * @param {any} value 
 * @returns {boolean}
 */
export const isIterable = (value) => typeOf(value?.[Symbol.iterator]) === 'Function';

/**
 * Checks if value is nullish
 * @param {any} value 
 * @returns {boolean}
 */
export const isNullish = (value) => value == null;

/**
 * Checks if value is primitive
 * @param {any} value 
 * @returns {boolean}
 */
export const isPrimitive = (value) => Object(value) !== value;

/**
 * Tries to execute and return function results, otherwise returns specified other value
 * @param {Function} callback 
 * @param {any} other 
 * @param {Array<any>} args optional parameter
 * @returns {any}
 */
export const attempt = (callback, other, args) => {
	try {
		return callback(...args);
	} catch {
		return other;
	}
}

/**
 * Sleeps for specified duration of time
 * @param {number} millis 
 * @returns {Promise}
 */
export const sleep = (millis) => new Promise((resolve) => setTimeout(resolve, millis));

/**
 * No-operation
 */
export const noop = () => {};

/**
 * Echo
 * @param {...any} args 
 * @returns {any}
 */
export const echo = (...args) => args.length < 2 ? args[0] : args;
