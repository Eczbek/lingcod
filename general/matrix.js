
import { typeOf } from './misc.js';


export const createMatrix = (dimensions, callback) => {
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

export const wrapMatrix = (array, dimensions = [array.length]) => {
	// todo
}

export const isRegular = (matrix, depth = Infinity) => {
	return typeOf(matrix) !== 'Array' || --depth < 0 || matrix.every((item) => item?.length === matrix[0]?.length && this.isRegular(item, depth));
}

export const getDimensions = (matrix) => {
	const dims = [matrix.length];
	if (this.isRegular(matrix, 1)) dims.push(this.getDimensions(matrix[0]));
	return dims;
}

export const rotateMatrix = (matrix, rotations) => {
	for (let i = 0; i < rotations % 4; ++i) {
		matrix = matrix[0].map((_, index) => matrix.map((item) => item[index]).reverse());
	}
	return matrix;
}
