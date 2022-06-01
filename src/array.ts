import { randInt } from './random.js';


export function compact(array: any[]): any[] {
	return array.filter(() => true);
}

export function range(max: number, min = 0, step = 1): any[] {
	const array = [];
	for (let i = min; i < max; i += step)
		array.push(i);
	return array;
}

export function fill(length: number, fillCallback: (index: number) => any): any[] {
	const array = [];
	for (let i = 0; i < length; ++i)
		array.push(fillCallback(i));
	return array;
}

export function includesAll(array: any[], values: any[]): boolean {
	return values.every((value) => array.includes(value));
}

export function filterByOccurences(array: any[], occurences: number, compareCallback = (value1: any, value2: any) => value1 === value2): any[] {
	return array.filter((value1, index1) => array.filter((value2, index2) => index1 === index2 || compareCallback(value1, value2)).length === occurences);
}

export function group(array: any[], getGroup: (value: any, index: number) => string, getValue = (value: any, index: number) => value): Map<string, any[]> {
	return array.reduce((map, value, index) => {
		const group = getGroup(value, index);
		if (!map.has(group))
			map.set(group, []);
		map.get(group).push(getValue(value, index));
		return map;
	}, new Map());
}

export function chunk([...array], getChunkSize: (value: any, index: number) => number, overflow = false): any[][] {
	const chunked = [];
	while (true) {
		const size = getChunkSize(array[chunked.length], chunked.length);
		if (array.length < size && !overflow || !array.length)
			return chunked;
		chunked.push(array.splice(0, size));
	}
}

export function filterIndices(array: any[], filterCallback: (value: any, index: number) => boolean): number[] {
	const indices = [];
	for (let i = 0; i < array.length; ++i)
		if (filterCallback(array[i], i))
			indices.push(i);
	return indices;
}

export function findIndexOfSubarray(array: any[], subarray: any[], wrap = false, compareCallback = (value1: any, value2: any) => value1 === value2): number {
	return array.findIndex((_, index1) => subarray.every((value, index2) => {
		const index = index1 + index2;
		return compareCallback(value, array[wrap ? index % array.length : index]);
	}));
}

export function findIndicesOfSubarray(array: any[], subarray: any[], wrap = false, compareCallback = (value1: any, value2: any) => value1 === value2): number[] {
	return filterIndices(array, (_, index1) => subarray.every((value, index2) => {
		const index = index1 + index2;
		return compareCallback(value, array[wrap ? index % array.length : index]);
	}));
}

export function findEmptyIndices(array: any[]): number[] {
	return filterIndices(array, (_, index) => !Object.hasOwn(array, index));
}

export function isSparse(array: any[]): boolean {
	for (let i = 0; i < array.length; ++i)
		if (!Object.hasOwn(array, i))
			return true;
	return false;
}

export function swap(array: any[], index1: number, index2: number): any[] {
	[array[index1], array[index2]] = [array[index2], array[index1]];
	return array;
}

export function shuffle([...array]: any[]): any[] {
	for (let i = array.length - 1; i > 0; --i)
		swap(array, i, randInt(i));
	return array;
}
