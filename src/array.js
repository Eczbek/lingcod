
import { randInt } from './random.js';


/**
 * Compacts array; Removes empty indices
 * @param {any[]} array 
 * @returns {any[]}
 */
export function compact (array) {
	return array.filter(() => true);
}

/**
 * Creates array with numbers from min to max
 * @param {number} max 
 * @param {number?} min 
 * @param {number?} step 
 * @returns {number[]}
 */
export function range (max, min = 0, step = 1) {
	const arr = [];
	for (let i = min; i < max; i += step) arr.push(i);
	return arr;
}

/**
 * Returns what to fill current index with
 * @callback fillCallback
 * @param {number} index 
 * @returns {any}
 */

/**
 * Creates an array and fills it
 * @param {number} length 
 * @param {fillCallback} fillCallback 
 * @returns {any[]}
 */
export function fill (length, fillCallback) {
	const arr = [];
	for (let i = 0; i < length; ++i) arr.push(fillCallback(i));
	return arr;
}

/**
 * Checks if array includes all values
 * @param {any[]} array 
 * @param {any[]} values 
 * @returns {boolean}
 */
export function includesAll (array, values) {
	return values.every((item) => array.includes(item));
}

/**
 * Checks if two values are equal
 * @callback compareCallback
 * @param {any} a 
 * @param {any} b 
 * @returns {boolean}
 */

/**
 * Filters values by how many times they appear in the array
 * @param {any[]} array 
 * @param {number} occurences 
 * @param {compareCallback?} compareCallback 
 * @returns {any[]}
 */
export function filterByOccurences (array, occurences, compareCallback = (a, b) => a === b) {
	return array.filter((item1) => array.filter((item2) => compareCallback(item1, item2)).length === occurences);
}

/**
 * Assigns a group to a value
 * @callback getGroupCallback
 * @param {any} value 
 * @param {number} index 
 * @returns {string}
 */

/**
 * Transforms a value
 * @callback getValueCallback
 * @param {any} value 
 * @param {number} index 
 * @returns {any}
 */

/**
 * Groups array items
 * @param {any[]} array 
 * @param {getGroupCallback} getGroup 
 * @param {getValueCallback?} getValue 
 * @returns {Map}
 */
export function group (array, getGroup, getValue = (x) => x) {
	return array.reduce((map, item, index) => {	
		const group = getGroup(item, index);
		if (!map.has(group)) map.set(group, []);
		map.get(group).push(getValue(item, index));
		return map;
	}, new Map());
}

/**
 * Appoints a chunk size
 * @callback getChunkSizeCallback
 * @param {any} value 
 * @param {number} index 
 * @returns {number}
 */

/**
 * Chunks an array into smaller arrays
 * @param {any[]} array 
 * @param {getChunkSizeCallback} getSize 
 * @param {boolean?} overflow 
 * @returns {any[][]}
 */
export function chunk ([...array], getSize, overflow = false) {
	const result = [];
	while (true) {
		const size = getSize(array[result.length], result.length);
		if (array.length < size && !overflow || !array.length) return result;
		result.push(array.splice(0, size));
	}
}

/**
 * Checks whether to keep this value in it's array
 * @callback filterCallback
 * @param {any} value 
 * @param {number} index 
 * @returns {boolean}
 */

/**
 * Filters indices
 * @param {any[]} array 
 * @param {filterCallback} filterCallback 
 * @returns {number[]}
 */
export function filterIndices (array, filterCallback) {
	const result = [];
	for (let i = 0; i < array.length; ++i) if (filterCallback(array[i], i)) result.push(i);
	return result;
}

/**
 * Finds the first index of a matched sequence
 * @param {any[]} array 
 * @param {any[]} sequence 
 * @param {compareCallback?} compareCallback 
 * @param {boolean?} wrap 
 * @returns {number}
 */
export function findIndexOfSequence (array, sequence, compareCallback = (a, b) => a === b, wrap = false) {
	return array.findIndex((_, index1) => sequence.every((item, index2) => {
		const index = index1 + index2;
		return compareCallback(item, array[wrap ? index % array.length : index]);
	}));
}

/**
 * Finds indices of all matched sequences
 * @param {any[]} array 
 * @param {any[]} sequence 
 * @param {compareCallback?} compareCallback 
 * @param {boolean?} wrap 
 * @returns {number[]}
 */
export function findIndicesOfSequence (array, sequence, compareCallback = (a, b) => a === b, wrap = false) {
	return filterIndices(array, (_, index1) => sequence.every((item, index2) => {
		const index = index1 + index2;
		return compareCallback(item, array[wrap ? index % array.length : index]);
	}));
}

/**
 * Finds indices without a value
 * @param {any[]} array 
 * @returns {number[]}
 */
export function findEmptyIndices (array) {
	return filterIndices(array, (_, index) => !Object.hasOwn(array, index));
}

/**
 * Checks whether array has empty indices
 * @param {any[]} array 
 * @returns {boolean}
 */
export function isSparse (array) {
	for (let i = 0; i < array.length; ++i) if (!Object.hasOwn(array, i)) return true;
	return false;
}

/**
 * Swaps two indices
 * @param {any[]} array 
 * @param {number} index1 
 * @param {number} index2 
 * @returns {any[]}
 */
export function swap (array, index1, index2) {
	[array[index1], array[index2]] = [array[index2], array[index1]];
	return array;
}

/**
 * Shuffles the array randomly
 * @param {any[]} array 
 * @returns {any[]}
 */
export function shuffle (array) {
	for (let i = array.length - 1; i > 0; --i) swap(array, [i, randInt(i)]);
	return array;
}
