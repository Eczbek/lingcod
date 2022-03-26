
import { typeOf } from './misc.js';


export function createMatrix (dimensions, callback = () => 0) {
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

export function wrapMatrix (array, dimensions = [array.length]) {
	let i = 0;
	return createMatrix(dimensions, () => array[i++]);
}

export function isRegular (matrix, depth = Infinity) {
	return typeOf(matrix) !== 'Array' || --depth < 0 || matrix.every((item) => item?.length === matrix[0]?.length && this.isRegular(item, depth));
}

export function getDimensions (matrix) {
	const dims = [matrix.length];
	if (this.isRegular(matrix, 1)) dims.push(this.getDimensions(matrix[0]));
	return dims;
}

export function rotateMatrix (matrix, rotations = 1) {
	for (let i = 0; i < rotations % 4; ++i) {
		matrix = matrix[0].map((_, index) => matrix.map((item) => item[index]).reverse());
	}
	return matrix;
}
