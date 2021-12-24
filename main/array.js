import { typeOf } from './misc.js';
import { deepCompare } from './deep.js';



/**
 * Creates dense array of length
 * @param {number} length 
 * @returns {undefined[]}
 */
export function createArray (length) {
	const array = [];
	for (let i = 0; i < length; i++) {
		array.push(undefined);
	}
	return array;
}


/**
 * Creates dense array with items
 * @param  {...any} items 
 * @returns {any[]}
 */
export function arrayFrom (...items) {
	if (items.length === 1) {
		switch (typeOf(items[0])) {
			case 'Object':
				return Object.entries(items[0]);
			case 'Array':
				return items[0];
			case 'Map':
			case 'Set':
				return [...items[0]];
		}
		return [items[0]];
	} else {
		const array = [];
		for (const item of items) {
			array.push(item);
		}
		return array;
	}
}


/**
 * Finds index of the first matched sequence
 * @param {any[]} array 
 * @param {any[]} sequence 
 * @returns {number}
 */
export function findIndexOfSequence (array, sequence) {
	return array.findIndex((_, index1) => sequence.every((item, index2) => deepCompare(item, array[index1 + index2])));
}


/**
 * Checks if array includes all values
 * @param {any[]} array 
 * @param  {...any} items 
 * @returns {boolean}
 */
export function includesAll (array, ...items) {
	return items.every((item) => array.includes(item));
}


/**
 * Filters items in array by occurence
 * @param {any[]} array 
 * @param {number} count 
 * @returns {any[]}
 */
export function filterByOccurences (array, count) {
	return array.filter((item1, index1) => array.filter((item2, index2) => index1 === index2 || deepCompare(item1, item2)).length === count);
}


/**
 * Groups values
 * @param {any[]} array 
 * @param {Function} getGroup 
 * @param {Function} getValue optional
 * @returns {Map}
 */
export function groupArray (array, getGroup, getValue = (x) => x) {
	return array.reduce((map, item, index) => {
		const group = getGroup(item, index);
		if (!map.has(group)) {
			map.set(group, []);
		}
		map.get(group).push(getValue(item, index));
		return map;
	}, new Map());
}


/**
 * Chunks array into smaller arrays
 * @param {any[]} array 
 * @param {number} size 
 * @param {boolean} overflow optional
 * @returns {any[][]}
 */
export function chunkArray (array, size, overflow = true) {
	const result = [];
	while (true) {
		const s = typeOf(size) === 'Function' ? size(array[result.length], result.length, array) : size;
		if (array.length >= s || overflow && array.length > 0) {
			result.push(array.splice(0, s));
		} else {
			return result;
		}
	}
}


/**
 * Checks if all items in array are equal to value
 * @param {any[]} array 
 * @param {any} value optional
 * @returns {boolean}
 */
export function contentsAreEqual (array, value = array[0]) {
	return array.every((item) => deepCompare(item, value));
}


/**
 * Filters indeces by callback
 * @param {any[]} array 
 * @param {Function} callback 
 * @returns {number[]}
 */
export function filterIndeces (array, callback) {
	const result = [];
	for (let i = 0; i < array.length; i++) {
		if (callback(array[i], i)) {
			result.push(i);
		}
	}
	return result;
}


/**
 * Finds differing indeces between two arrays
 * @param {any[]} array1 
 * @param {any[]} array2 
 * @returns {number[]}
 */
export function findDifferingIndeces(array1, array2) {
	return filterIndeces(array1, (item, index) => !deepCompare(item, array2[index]));
}


/**
 * Finds differing items between two arrays
 * @param {any[]} array1 
 * @param {any[]} array2 
 * @returns 
 */
export function findDifference (array1, array2) {
	return array1.filter((item, index) => !deepCompare(item, array2[index]));
}


/**
 * Finds missing indeces in array
 * @param {any[]} array 
 * @returns {number[]}
 */
export function findMissingIndeces (array) {
	return filterIndeces(array, (_, index) => !array.hasOwnProperty(index));
}


/**
 * Checks if array has missing indeces, or is sparse
 * @param {any[]} array 
 * @returns {boolean}
 */
export function isSparse (array) {
	return findMissingIndeces(array).length > 0;
}


/**
 * Swaps items by indeces
 * @param {any[]} array 
 * @param  {...any} indeces 
 * @returns {any[]}
 */
export function swapIndeces (array, ...indeces) {
	for (let i = 0; i < indeces.length - 1; i++) {
		const index = indeces[i];
		const temp = array[index];
		array[index] = array[indeces.at(i - 1)];
		array[indeces.at(i - 1)] = temp;
	}
	return array;
}


/**
 * Moves items around
 * @param {any[]} array 
 * @returns {any[]}
 */
export function shuffleArray (array) {
	for (let i = array.length - 1; i > 0; i--) {
		const rand = randomInteger(i);
		const temp = array[i];
		array[i] = array[rand];
		array[rand] = temp;
	}
	return array;
}