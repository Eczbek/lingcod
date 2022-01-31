
import { typeOf } from './misc.js';


/**
 * Matrix creation callback
 * @callback matrixCreationCallback
 * @param {Array<number>} indices 
 * @returns {any}
 */

/**
 * Creates a multidimensional matrix
 * @param {Array<number>} dimensions 
 * @param {matrixCreationCallback} callback optional parameter
 * @returns {Array<any>}
 */
export const createMatrix = (dimensions, callback = () => 0) => {
	return (function loop (prevDims = [...dimensions], indices = []) {
		const mat = [];
		const [dim, ...dims] = prevDims;
		for (let i = 0; i < dim; ++i) {
			const currIndices = [...indices, i];
			mat.push(dims.length ? loop(dims, currIndices) : callback(currIndices));
		}
		return mat;
	})();
}

/**
 * Wraps array into specified dimensions
 * @param {Array<any>} array 
 * @param {Array<number>} dimensions optional parameter
 * @returns {Array<any>}
 */
export const wrapMatrix = (array, dimensions = [array.length]) => {
	let i = 0;
	return createMatrix(dimensions, () => array[i++]);
}

/**
 * Checks if matrix is regular, or "even"
 * @param {Array<any>} matrix 
 * @param {number} depth optional parameter
 * @returns {boolean}
 */
export const isRegular = (matrix, depth = Infinity) => {
	return typeOf(matrix) !== 'Array' || --depth < 0 || matrix.every((item) => item?.length === matrix[0]?.length && this.isRegular(item, depth));
}

/**
 * Gets dimensions of matrix
 * @param {Array<any>} matrix 
 * @returns {Array<number>}
 */
export const getDimensions = (matrix) => {
	const dims = [matrix.length];
	if (this.isRegular(matrix, 1)) dims.push(this.getDimensions(matrix[0]));
	return dims;
}

/**
 * Rotates matrix clockwise by 90 degrees
 * @param {Array<Array<any>>} matrix 
 * @param {number} rotations optional parameter
 * @returns {Array<Array<any>>}
 */
export const rotateMatrix = (matrix, rotations = 1) => {
	for (let i = 0; i < rotations % 4; ++i) {
		matrix = matrix[0].map((_, index) => matrix.map((item) => item[index]).reverse());
	}
	return matrix;
}
