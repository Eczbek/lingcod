import { typeOf } from './misc.js';



/**
 * Creates a multidimensional array
 * @param {number[]} dimensions 
 * @param {any} fill optional
 * @returns {any[]}
 */
export function createMatrix (dimensions, fill) {
	function loop (dims = dimensions, indices = []) {
		const matrix = [];
		const dimension = dims.shift();
		for (let i = 0; i < dimension; i++) {
			const next = [...indices, i];
			matrix.push(dims.length > 0
				? loop([...dims], next)
				: typeOf(fill) === 'Function'
					? fill(next)
					: fill);
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
	if (typeOf(matrix[0]) === 'Array' && _Array.contentsAreEqual(matrix.map(({ length }) => length))) dimensions.push(...getDimensions(matrix[0]));
	return dimensions;
}


/**
 * Rotates a 2D matrix clockwise
 * @param {any[][]} matrix 
 * @param {number} count 
 * @returns {any[][]}
 */
export function rotateMatrix (matrix, count) {
	const [x, y] = [[1, 0], [1, 1], [0, 1]][(count % 4 + 4) % 4];
	const a = matrix[0].map((_, index) => {
		const b = matrix.map((item) => item[index]);
		return y ? b.reverse() : b;
	});
	return x ? a.reverse() : a;
}


export function chunkMatrix (matrix, ) {

}
