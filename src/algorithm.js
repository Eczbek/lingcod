
import { swap } from './array.js';


export function binarySearch (sortedArray, searchCallback) {
	let least = 0;
	let most = sortedArray.length;
	while (true) {
		const mid = Math.floor((most - least) / 2) + least;
		const check = searchCallback(sortedArray[mid]);
		if (!check) return mid;
		if (most - least < 2) return;
		if (check > 0) least = mid + 1;
		else most = mid;
	}
}

export function mergeSort (array, sortCallback = (a, b) => a - b) {
	if (array.length < 2) return array;
	const half = array.length / 2;
	const left = mergeSort(array.slice(0, half));
	const right = mergeSort(array.slice(half));
	const sorted = [];
	while (left.length && right.length) {
		sorted.push((sortCallback(left[0], right[0]) < 0 ? left : right).shift());
	}
	return [...sorted, ...left, ...right];
}

export function heapSort ([...array], sortCallback = (a, b) => a - b) {
	function heapify (array, size, index) {
		let min = index;
		const left = index * 2 + 1;
		const right = left + 1;
		if (left < size && sortCallback(array[left], array[min]) > 0) min = left;
		if (right < size && sortCallback(array[right], array[min]) > 0) min = right;
		if (min !== index) {
			swap(array, min, index);
			heapify(array, size, min);
		}
	}
	for (let i = Math.floor(array.length / 2 - 1); i >= 0; --i) {
		heapify(array, array.length, i);
	}
	for (let i = array.length - 1; i >= 0; --i) {
		swap(array, i, 0);
		heapify(array, i, 0);
	}
	return array;
}
