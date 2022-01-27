
/**
 * Sorts array via insertion method (better for small arrays)
 * @param {Array<any>} array 
 * @param {Function} check optional parameter
 * @returns {Array<any>}
 */
export const insertSort = (array, check = (a, b) => a < b) => {
	array.forEach((item, i) => {
		for (let j = 0; j < i; ++j) {
			if (check(item, array[j])) array.splice(j, 0, ...array.splice(i, 1));
		}
	});
	return array;
}

/**
 * Sorts array via merge method (better for large arrays)
 * @param {Array<any>} array 
 * @param {Function} check optional parameter
 * @returns {Array<any>}
 */
export const mergeSort = (array, check = (a, b) => a < b) => {
	return (function div (arr = array) {
		if (array.length < 2) return array;
		const mid = Math.floor(array.length / 2);
		return (function (arr1, arr2) {
			const result = [];
			while (arr1.length && arr2.length) {
				result.push((check(arr1[0], arr2[0]) ? arr1 : arr2).shift());
			}
			return [...result, ...arr1, ...arr2];
		})(div(array.slice(0, mid)), div(arr.slice(mid)));
	})();
}
