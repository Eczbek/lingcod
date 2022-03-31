
import { lerp } from './math.js';


/**
 * Generate a random float
 * @param {number} max 
 * @param {number} min 
 * @param {boolean} inclusive 
 * @returns {number}
 */
export function randFloat (max = 1, min = 0, inclusive = false) {
	return lerp(Math.random(), max + inclusive, min);
}

/**
 * Generate a random integer
 * @param {number} max 
 * @param {number} min 
 * @param {boolean} inclusive 
 * @returns {number}
 */
export function randInt (max = Number.MAX_SAFE_INTEGER, min, inclusive) {
	return Math.floor(randFloat(max, min, inclusive));
}

/**
 * Generate a random boolean
 * @returns {boolean}
 */
export function randBool () {
	return !!randInt(2);
}

/**
 * Pick a random item from an array
 * @param {any[]} array 
 * @returns {any}
 */
export function randItem (array) {
	return array[randInt(array.length)];
}

/**
 * Create an array from randomly picked values
 * @param {number} length 
 * @param {(index: number) => any[]} getValues 
 * @returns {any[]}
 */
export function randArray (length, getValues) {
	const arr = [];
	for (let i = 0; i < length; ++i) arr.push(randItem(getValues(i)));
	return arr;
}

/**
 * Create a string from randomly picked characters
 * @param {number} length 
 * @param {(index: number) => string} getChars 
 * @returns {string}
 */
export function randString (length, getChars) {
	return randArray(length, getChars).join('');
}

/**
 * Generate a radom hex color
 * @param {string} max 
 * @param {string} min 
 * @returns {string}
 */
export function randHexColor (max = '#ffffff', min = '#000000') {
	max = max.replace('#', '');
	min = min.replace('#', '');
	return `#${randString(6, (index) => {
		const minNum = Number(`0x${min[index]}`);
		return randInt(Math.max(Number(`0x${max[index]}`), minNum), minNum).toString(16);
	})}`;
}