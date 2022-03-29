
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

export function wrapMatrix (array, dimensions = [array.length]) {
	let i = 0;
	return createMatrix(dimensions, () => array[i++]);
}

export function isRegular (matrix, depth = Infinity) {
	return --depth < 0 || !Array.isArray(matrix) || matrix.every((item) => item?.length === matrix[0]?.length && this.isRegular(item, depth));
}

export function getDimensions (matrix) {
	const dims = [matrix.length];
	if (this.isRegular(matrix, 1)) dims.push(this.getDimensions(matrix[0]));
	return dims;
}

export function rotateMatrix (matrix, rotations = 1) {
	for (let i = 0; i < rotations % 4; ++i) matrix = matrix[0].map((_, index) => matrix.map((item) => item[index]).reverse());
	return matrix;
}
