
import { swap } from './array.js';


export function binarySearch (sortedArray: any[], searchCallback: (value: any, index: number) => number) {
	let left = 0;
	let right = sortedArray.length;
	while (true) {
		const mid = Math.floor((right - left) / 2 + left);
		const check = searchCallback(sortedArray[mid], mid);
		if (!check) return mid;
		if (right - left < 2) return -1;
		if (check > 0) left = mid + 1;
		else right = mid;
	}
}

export function mergeSort (array: any[], sortCallback = (value1: any, value2: any) => value1 - value2): any[] {
	if (array.length < 2) return array;
	const half = array.length / 2;
	const left = mergeSort(array.slice(0, half), sortCallback);
	const right = mergeSort(array.slice(half), sortCallback);
	const sorted = [];
	while (left.length && right.length) sorted.push((sortCallback(left[0], right[0]) > 0 ? right : left).shift());
	return [...sorted, ...left, ...right];
}

export function heapSort ([...array]: any[], sortCallback = (value1: any, value2: any) => value1 - value2) {
	function heapify (chunk: any[], size: number, index: number) {
		let min = index;
		const left = index * 2 + 1;
		const right = left + 1;
		if (left < size && sortCallback(chunk[min], chunk[left]) < 0) min = left;
		if (right < size && sortCallback(chunk[min], chunk[right]) < 0) min = right;
		if (min !== index) {
			swap(chunk, min, index);
			heapify(chunk, size, min);
		}
	}
	for (let i = Math.floor(array.length / 2 - 1); i >= 0; --i) heapify(array, array.length, i);
	for (let i = array.length - 1; i >= 0; --i) {
		swap(array, i, 0);
		heapify(array, i, 0);
	}
	return array;
}
