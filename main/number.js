import { typeOf } from './misc.js';



/**
 * Checks if value is a number
 * @param {any} value 
 * @returns {boolean}
 */
export function isNumber (value) {
	return typeOf(value) === 'Number' && !Number.isNaN(value) && Number.isFinite(value);
}


/**
 * Checks if number is even
 * @param {number} number 
 * @returns {boolean}
 */
export function isEven (number) {
	return number % 2 === 0;
}


/**
 * Checks if number is prime
 * @param {number} number 
 * @returns {boolean}
 */
export function isPrime (number) {
	for (let i = 2; i <= Math.sqrt(number); i++) {
		if (number % i === 0) return false;
	}
	return number > 1;
}
