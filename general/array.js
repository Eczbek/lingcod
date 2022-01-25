
import { randomInteger } from './random.js';
import { deepClone } from './deep.js';


export const range = (max, min = 0, step = 1) => {
	const arr = [];
	for (let i = min; i < max; i += step) {
		arr.push(i);
	}
	return arr;
}

export const includesAll = (array, values) => values.every((item) => array.includes(item));

export const filterByOccurences = (array, occurences) => array.filter((item1) => array.filter((item2) => item1 === item2).length === occurences);

export const group = (array, getGroup, getValue = (x) => x) => array.reduce((map, item, index) => {		const group = getGroup(item, index, [...array]);
	if (!map.has(group)) map.set(group, []);
	map.get(group).push(getValue(item, index));
	return map;
}, new Map());

export const chunk = (array, getSize, overflow = false) => {
	const result = [];
	while (true) {
		const size = getSize(array[result.length], result.length, [...array]);
		if (array.length < size && !overflow && !array.length) return result;
		result.push(array.splice(0, size));
	}
}

export const contentsAreEqual = (array, value = array[0]) => array.every((item) => item === value);

export const filterIndices = (array, callback) => {
	const result = [];
	for (let i = 0; i < array.length; ++i) {
		if (callback(array[i], i)) result.push(i);
	}
	return result;
}

export const findIndexOfSequence = (array, sequence) => array.findIndex((_, index1) => sequence.every((item, index2) => item === array[index1 + index2]));

export const findIndicesOfSequence = (array, sequence) => filterIndices(array, (_, index1) => sequence.every((item, index2) => item === array[index1 + index2]));

export const findMissingIndices = (array) => filterIndices(array, (_, index) => !Object.hasOwn(array, index));

export const isSparse = (array) => {
	for (let i = 0; i < array.length; ++i) {
		if (!Object.hasOwn(array, i)) return true;
	}
	return false;
}

export const swap = (array, indices) => {
	for (let i = 0; i < indices.length - 1; ++i) {
		const prev = indices.at(i - 1);
		[array[indices[i]], array[prev]] = [array[prev], array[indices[i]]];
	}
	return array;
}

export const shuffle = (array) => {
	for (let i = array.length - 1; i > 0; --i) {
		swap(array, [i, randomInteger(i)]);
	}
	return array;
}

export const multiple = (item, count) => {
	const result = [];
	for (let i = 0; i < count; ++i) {
		result.push(deepClone(item));
	}
	return result;
}
