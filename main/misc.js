export const PRIMITIVES = ['String', 'Number', 'BigInt', 'Boolean', 'Symbol', 'undefined', 'null'];


/**
 * Gets the class/type of a value
 * @param {any} value 
 * @returns {string}
 */
export function typeOf (value) {
	return String(value?.constructor?.name);
}


/**
 * Checks if value is nullish
 * @param {any} value 
 * @returns {boolean}
 */
export function isNullish (value) {
	return [undefined, null].includes(value);
}


/**
 * Checks if value is primitive
 * @param {any} value 
 * @returns {boolean}
 */
export function isPrimitive  (value) {
	return PRIMITIVES.includes(typeOf(value));
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
		return typeOf(other) === 'Function' ? other(...args) : other;
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


export function egg (egg) {
	for (let eg = 0; eg < egg; eg++) {
		console.log('egg');
	}
}
