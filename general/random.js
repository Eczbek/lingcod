
import { lerp } from './math.js';


/**
 * Generates random float between min and max
 * @param {number} max optional parameter
 * @param {number} min optional parameter
 * @returns {number}
 */
export const randFloat = (max = 1, min = 0) => lerp(Math.random(), max, min);

/**
 * Generates random integer between min and max
 * @param {number} max optional parameter
 * @param {number} min optional parameter
 * @returns {number}
 */
export const randInt = (max = Number.MAX_SAFE_INTEGER, min) => Math.floor(randFloat(max, min));

/**
 * Generates random boolean
 * @returns {boolean}
 */
export const randBool = () => !!randInt(2);

/**
 * Gets random item from array
 * @param {Array<any>} array 
 * @returns {any}
 */
export const randItem = (array) => array[randInt(array.length)];

/**
 * Creates an array of length with randomly assorted items
 * @param {number} length 
 * @param {Function | Array<any>} getValues 
 * @returns {Array<any>}
 */
export const randArray = (length, getValues) => {
	const arr = [];
	for (let i = 0; i < length; ++i) {
		arr.push(randItem(typeOf(getValues) === 'Function' ? getValues(i) : getValues));
	}
	return arr;
}

/**
 * Creates a string of length with randomly assorted characters
 * @param {number} length 
 * @param {Function | string} getChars 
 * @returns {string}
 */
export const randString = (length, getChars) => randArray(length, getChars).join('');

/**
 * Generates a random hex color between min and max
 * @param {string} max optional parameter
 * @param {string} min optional parameter
 * @returns {string}
 */
export const randHexColor = (max = '#ffffff', min = '#000000') => {
	max = max.replace('#', '');
	min = min.replace('#', '');
	return `#${randString(6, (index) => {
		const minNum = Number(`0x${min[index]}`);
		return randInt(Math.max(Number(`0x${max[index]}`), minNum), minNum).toString(16);
	})}`
}
