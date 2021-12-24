import { typeOf } from './misc.js';



/**
 * Creates a multidimensional array
 * @param {number[]} dimensions 
 * @param {any} fill optional
 * @returns {any[]}
 */
export function createMatrix (dimensions, fill) {
	function loop (dims = dimensions, indeces = []) {
		const matrix = [];
		const dimension = dims.shift();
		for (let i = 0; i < dimension; i++) {
			const next = [...indeces, i];
			matrix.push(dims.length > 0 ? loop([...dims], next) : typeOf(fill) === 'Function' ? fill(next) : fill);
		}
		return matrix;
	}
	return loop();
}


/**
 * Wraps an array into dimensions
 * @param {any[]} array 
 * @param {number[]} sizes 
 * @param {boolean} overflow optional
 */
export function wrapMatrix (array, sizes, overflow = true) {
	// TO-DO
}


/**
 * Finds dimensions of a matrix
 * @param {any[]} matrix 
 * @returns {number[]}
 */
export function getDimensions (matrix) {
	const dimensions = [matrix.length];
	if (typeOf(matrix[0]) === 'Array' && _Array.contentsAreEqual(matrix.map(({ length }) => length))) {
		dimensions.push(...getDimensions(matrix[0]));
	}
	return dimensions;
}