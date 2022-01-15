
import { typeOf } from './misc.js';


/**
 * Generates a float between max and min, or 1 and 0
 * @param {number} max optional
 * @param {number} min optional
 * @returns {number}
 */
export function randomFloat (max = 1, min = 0) {
	return Math.random() * (max - min) + min;
}

/**
 * Generates an integer between max and min, or MAX_SAFE_INTEGER and 0
 * @param {number} max optional
 * @param {number} min optional
 * @returns {number}
 */
export function randomInteger (max = Number.MAX_SAFE_INTEGER, min) {
	return Math.floor(randomFloat(max, min));
}

/**
 * Takes a random item from an array
 * @param {any[]} array 
 * @returns {any}
 */
export function randomItem (array) {
	return array[randomInteger(array.length)];
}

/**
 * Creates an assortment of items from array
 * @param {number} length 
 * @param {any[]} array 
 * @returns {any[]}
 */
export function randomAssortment (length, array) {
	const result = [];
	for (let i = 0; i < length; i++) {
		result.push(randomItem(typeOf(array) === 'Function'
			? array(i)
			: array));
	}
	return result;
}

/**
 * Same as assortment, but stringified
 * @param {number} length 
 * @param {string} characters 
 * @returns {string}
 */
export function randomString (length, characters) {
	return randomAssortment(length, characters).join('');
}

/**
 * Generates a hex color between max and min, or #ffffff and #000000
 * @param {string} max optional
 * @param {string} min optional
 * @returns {string}
 */
export function randomHexColor (max = '#ffffff', min = '#000000') {
	return `#${randomString(6, (index) => {
		const minNum = Number(`0x${min.replace('#', '')[index]}`);
		return randomInteger(Math.max(Number(`0x${max.replace('#', '')[index]}`), minNum), minNum).toString(16);
	})}`;
}
