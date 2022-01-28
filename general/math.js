
import { spliceString } from './string.js';


/**
 * norm
 * @param {number} number 
 * @param {number} max 
 * @param {number} min optional parameter
 * @returns {number}
 */
export const norm = (number, max, min = 0) => (number - min) / (max - min);

/**
 * lerp
 * @param {number} number 
 * @param {number} max 
 * @param {number} min optional parameter
 * @returns {number}
 */
export const lerp = (number, max, min = 0) => number * (max - min) + min;

/**
 * clamp
 * @param {number} number 
 * @param {number} max 
 * @param {number} min optional parameter
 * @returns {number}
 */
export const clamp = (number, max, min = 0) => Math.min(Math.max(number, min), max);

/**
 * round
 * @param {number} number 
 * @param {number} step optional parameter
 * @returns {number}
 */
export const round = (number, step = 1) => Math.round(number / step) * step;

/**
 * Wraps number between min and max
 * @param {number} number 
 * @param {number} max 
 * @param {number} min optional parameter
 * @returns {number}
 */
export const wrap = (number, max, min = 0) => {
	const diff = max - min;
	return ((number - min) % diff + diff) % diff + min;
}

/**
 * Checks if number is prime
 * @param {number} number 
 * @returns {boolean}
 */
export const isPrime = (number) => {
	for (let i = 2; i <= Math.sqrt(number); ++i) {
		if (number % i === 0) return false;
	}
	return number > 1;
}

/**
 * Checks if two numbers are approximately equal
 * @param {number} number1 
 * @param {number} number2 
 * @param {number} absEpsilon optional parameter
 * @param {number} relEpsilon optional parameter
 * @returns {boolean}
 */
export const approxEqual = (number1, number2, absEpsilon = 1e-12, relEpsilon = 1e-8) => Math.abs(number1 - number2) <= Math.min(absEpsilon, Math.max(Math.abs(number1), Math.abs(number2)) * relEpsilon);

/**
 * Calculates PI to specified digits
 * @param {number} digits optional parameter
 * @returns {string}
 */
export const pi = (digits = 5) => {
	let result = '';
	for (let a = 180n, b = 1n, c = 60n, d = 2n, i = 0; i <= digits; ++i, d += 1n) {
		const x = ((d * 27n - 12n) * b + a * 5n) / (c * 5n);
		const y = (d * 3n + 1n) * (d * 3n + 2n) * 3n;
		a = ((d * 5n - 2n) * b - x * c + a) * y * 10n;
		b *= (d * 2n - 1n) * d * 10n;
		c *= y;
		result += x;
	}
	return spliceString(result, 1, 0, '.');
}

// 2D geometry moved to test file