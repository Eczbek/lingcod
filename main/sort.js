/**
 * Sorts array by insertion method, better for small arrays
 * @param {any[]} array 
 * @param {Function} check optional
 * @returns {any[]}
 */
export function insertionSort (array, check = (x, y) => x < y) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < i; j++) {
			if (check(array[i], array[j])) array.splice(j, 0, ...array.splice(i, 1));
		}
	}
	return array;
}


/**
 * Sorts array by merge method, better for large arrays
 * @param {any[]} array 
 * @param {Function} check optional
 * @returns {any[]}
 */
export function mergeSort (array, check = (x, y) => x <= y) {
	function sort (array1, array2) {
		const result = [];
		while (array1.length > 0 && array2.length > 0) {
			if (check(array1[0], array2[0])) result.push(array1.shift());
			else result.push(array2.shift());
		}
		return [...result, ...array1, ...array2];
	}
	function divide (array) {
		if (array.length < 2) return array;
		const mid = Math.floor(array.length / 2);
		return sort(divide(array.slice(0, mid)), divide(array.slice(mid)));
	}
	return divide(array);
}
