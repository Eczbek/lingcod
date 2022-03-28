
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
	return (function merge (left, right) {
		const array = [];
		while (left.length && right.length) {
			array.push((sortCallback(left[0], right[0]) < 0 ? left : right).shift());
		}
		return [...array, ...left, ...right];
	})(mergeSort(array.slice(0, half)), mergeSort(array.slice(half)));
}
