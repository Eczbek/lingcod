
import { typeOf } from './misc.js';


/**
 * Checks if value is a number
 * @param {any} value 
 * @returns {boolean}
 */
export function isNumber (value) {
	return typeOf(value) === 'Number' && Number.isFinite(value);
}
