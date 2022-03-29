
import { wrap } from './math.js';


/**
 * Creates a multidimensional array
 * @param {number[]} dimensions 
 * @param {(number[]) => any} fillCallback 
 * @returns {any[]}
 */
export function createMatrix (dimensions, fillCallback = () => 0) {
	return (function loop ([dimension, ...nextDimensions] = dimensions, indices = []) {
		const matrix = [];
		for (let i = 0; i < dimension; ++i) {
			const currentIndices = [...indices, i];
			matrix.push(nextDimensions.length ? loop(nextDimensions, currentIndices) : fillCallback(currentIndices));
		}
		return matrix;
	})();
}

/**
 * Wraps array into multiple dimensions
 * @param {any[]} array 
 * @param {number[]} dimensions 
 * @returns {any[]}
 */
export function wrapMatrix (array, dimensions) {
	let i = 0;
	return createMatrix(dimensions, () => array[i++]);
}

/**
 * Checks if matrix is "regular", or all elements are of same length
 * @param {any[]} matrix 
 * @param {number} depth 
 * @returns 
 */
export function isRegular (matrix, depth = Infinity) {
	return --depth < 0 || !Array.isArray(matrix) || matrix.every((item) => item?.length === matrix[0]?.length && this.isRegular(item, depth));
}

/**
 * Finds the dimensions of a matrix
 * @param {any[]} matrix 
 * @returns {number[]}
 */
export function getDimensions (matrix) {
	const dims = [matrix.length];
	if (this.isRegular(matrix, 1)) dims.push(this.getDimensions(matrix[0]));
	return dims;
}

/**
 * Rotates matrix by 90 degrees
 * @param {any[][]} matrix 
 * @param {number} rotations 
 * @returns {any[][]}
 */
export function rotateMatrix (matrix, rotations = 0) {
	rotations = wrap(Math.abs(rotations), 3, -1);
	for (let i = 0; i < Math.abs(rotations); ++i) {
		const result = matrix[0].map((_, index) => {
			const result = matrix.map((item) => item[index]);
			return rotations > 0 ? result.reverse() : result
		});
		matrix = rotations < 0 ? result.reverse() : result;
	}
	return matrix;
}
