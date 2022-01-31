
import { randInt } from './random.js';


/**
 * Index filter callback
 * @callback indexFilterCallback
 * @param {any} value 
 * @param {number} index 
 * @returns {boolean}
 */

/**
 * Removes holes from array, does not remove nullish values
 * @param {Array<any>} array 
 * @returns {Array<any>}
 */
export const compact = (array) => array.filter(() => true);

/**
 * Creates an array of numbers, scaling in order from min to max
 * @param {number} max 
 * @param {number} min optional parameter
 * @param {number} step optional parameter
 * @returns {Array<number>}
 */
export const range = (max, min = 0, step = 1) => {
	const arr = [];
	for (let i = min; i < max; i += step) {
		arr.push(i);
	}
	return arr;
}

/**
 * Checks if array contains several values
 * @param {Array<any>} array 
 * @param {Array<any>} values 
 * @returns {boolean}
 */
export const includesAll = (array, values) => values.every((item) => array.includes(item));

/**
 * Filters items by how many times they appear in the array
 * @param {Array<any>} array 
 * @param {number} occurences 
 * @returns {Array<any>}
 */
export const filterByOccurences = (array, occurences) => array.filter((item1) => array.filter((item2) => item1 === item2).length === occurences);

/**
 * Sorts items into groups
 * @param {Array<any>} array 
 * @param {Function} getGroup 
 * @param {Function} getValue optional parameter
 * @returns {Map}
 */
export const group = (array, getGroup, getValue = (x) => x) => array.reduce((map, item, index) => {		const group = getGroup(item, index, [...array]);
	if (!map.has(group)) map.set(group, []);
	map.get(group).push(getValue(item, index));
	return map;
}, new Map());

/**
 * Splits array into several arrays
 * @param {Array<any>} array 
 * @param {Function} getSize 
 * @param {boolean} overflow optional parameter
 * @returns {Array<Array<any>>}
 */
export const chunk = (array, getSize, overflow = false) => {
	const result = [];
	while (true) {
		const size = getSize(array[result.length], result.length, [...array]);
		if (array.length < size && !overflow && !array.length) return result;
		result.push(array.splice(0, size));
	}
}

/**
 * Checks if all items in array are equal to value, or first item by default
 * @param {Array<any>} array 
 * @param {any} value optional parameter
 * @returns {boolean}
 */
export const contentsAreEqual = (array, value = array[0]) => array.slice(1).every((item) => item === value);

/**
 * Filters indices
 * @param {Array<any>} array 
 * @param {indexFilterCallback} callback 
 * @returns {Array<number>}
 */
export const filterIndices = (array, callback) => {
	const result = [];
	for (let i = 0; i < array.length; ++i) {
		if (callback(array[i], i)) result.push(i);
	}
	return result;
}

/**
 * Finds index of start of first sequence match
 * @param {Array<any>} array 
 * @param {Array<any>} sequence 
 * @param {boolean} loop optional parameter
 * @returns {number}
 */
export const findIndexOfSequence = (array, sequence, loop = false) => array.findIndex((_, index1) => sequence.every((item, index2) => {
	const index = index1 + index2;
	return item === array[loop ? index % array.length : index];
}));

/**
 * Finds indices of starts of all sequence matches
 * @param {Array<any>} array 
 * @param {Array<any>} sequence 
 * @param {boolean} loop optional parameter
 * @returns {Array<number>}
 */
export const findIndicesOfSequence = (array, sequence, loop = false) => filterIndices(array, (_, index1) => sequence.every((item, index2) => {
	const index = index1 + index2;
	return item === array[loop ? index % array.length : index];
}));

/**
 * Finds empty indices, or "holes"
 * @param {Array<any>} array 
 * @returns {Array<number>}
 */
export const findEmptyIndices = (array) => filterIndices(array, (_, index) => !Object.hasOwn(array, index));

/**
 * Checks if array contains holes
 * @param {Array<any>} array 
 * @returns {boolean}
 */
export const isSparse = (array) => {
	for (let i = 0; i < array.length; ++i) {
		if (!Object.hasOwn(array, i)) return true;
	}
	return false;
}

/**
 * Swaps items by index, modifies passed array
 * @param {Array<any>} array 
 * @param {Array<number>} indices 
 * @returns {Array<any>}
 */
export const swap = (array, indices) => {
	for (let i = 0; i < indices.length - 1; ++i) {
		const prev = indices.at(i - 1);
		[array[indices[i]], array[prev]] = [array[prev], array[indices[i]]];
	}
	return array;
}

/**
 * Shuffles items randomly, modifies passed array
 * @param {Array<any>} array 
 * @returns {Array<any>}
 */
export const shuffle = (array) => {
	for (let i = array.length - 1; i > 0; --i) {
		swap(array, [i, randInt(i)]);
	}
	return array;
}

/**
 * Creates array of duplicate items
 * @param {any} value 
 * @param {number} count 
 * @returns {Array<any>}
 */
export const multiply = (value, count) => {
	const result = [];
	for (let i = 0; i < count; ++i) {
		result.push(value);
	}
	return result;
}
