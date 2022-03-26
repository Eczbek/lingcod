
import { randInt } from './random.js';


export function compact (array) {
	return array.filter(() => true);
}

export function range (max, min = 0, step = 1) {
	const arr = [];
	for (let i = min; i < max; i += step) {
		arr.push(i);
	}
	return arr;
}

export function fill (length, fillCallback) {
	const arr = [];
	for (let i = 0; i < length; ++i) {
		arr.push(fillCallback(i));
	}
	return arr;
}

export function includesAll (array, values) {
	return values.every((item) => array.includes(item));
}

export function filterByOccurences (array, occurences) {
	return array.filter((item1) => array.filter((item2) => item1 === item2).length === occurences);
}

export function group (array, getGroup, getValue = (x) => x) {
	return array.reduce((map, item, index) => {	
		const group = getGroup(item, index, [...array]);
		if (!map.has(group)) map.set(group, []);
		map.get(group).push(getValue(item, index));
		return map;
	}, new Map());
}

export function chunk (array, getSize, overflow = false) {
	const result = [];
	while (true) {
		const size = getSize(array[result.length], result.length, [...array]);
		if (array.length < size && !overflow && !array.length) return result;
		result.push(array.splice(0, size));
	}
}

export function contentsAreEqual (array, value = array[0]) {
	return array.slice(1).every((item) => item === value);
}

export function filterIndices (array, callback) {
	const result = [];
	for (let i = 0; i < array.length; ++i) {
		if (callback(array[i], i)) result.push(i);
	}
	return result;
}

export function findIndexOfSequence (array, sequence, loop = false) {
	return array.findIndex((_, index1) => sequence.every((item, index2) => {
		const index = index1 + index2;
		return item === array[loop ? index % array.length : index];
	}));
}

export function findIndicesOfSequence (array, sequence, loop = false) {
	return filterIndices(array, (_, index1) => sequence.every((item, index2) => {
		const index = index1 + index2;
		return item === array[loop ? index % array.length : index];
	}));
}

export function findEmptyIndices (array) {
	return filterIndices(array, (_, index) => !Object.hasOwn(array, index));
}

export function isSparse (array) {
	for (let i = 0; i < array.length; ++i) {
		if (!Object.hasOwn(array, i)) return true;
	}
	return false;
}

export function swap (array, indices) {
	for (let i = 0; i < indices.length - 1; ++i) {
		const prev = indices.at(i - 1);
		[array[indices[i]], array[prev]] = [array[prev], array[indices[i]]];
	}
	return array;
}

export function shuffle (array) {
	for (let i = array.length - 1; i > 0; --i) {
		swap(array, [i, randInt(i)]);
	}
	return array;
}