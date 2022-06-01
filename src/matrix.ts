import { wrap } from './math.js';


export function createMatrix(dimensions: number[], fillCallback = (indices: number[]) => 0): any[] {
	return (function loop ([dimension, ...nextDimensions] = dimensions, prevIndices: number[] = []): any[] {
		const matrix = [];
		for (let i = 0; i < dimension; ++i) {
			const indices = [...prevIndices, i];
			matrix.push(nextDimensions.length
				? loop(nextDimensions, indices)
				: fillCallback(indices));
		}
		return matrix;
	})();
}

export function wrapMatrix(array: any[], dimensions: number[]): any[] {
	let i = 0;
	return createMatrix(dimensions, () => array[i++]);
}

export function isRegular(matrix: any[], depth = Infinity): boolean {
	return --depth < 0 || !Array.isArray(matrix) || matrix.every((item) => item?.length === matrix[0]?.length && isRegular(item, depth));
}

export function getDimensions(matrix: any[]): number[] {
	const dims = [matrix.length];
	if (isRegular(matrix, 1))
		dims.push(...getDimensions(matrix[0]));
	return dims;
}

export function rotateMatrix(matrix: any[][], rotations = 0): any[][] {
	rotations = wrap(Math.abs(rotations), 3, -1);
	for (let i = 0; i < Math.abs(rotations); ++i) {
		const result = matrix[0].map((_, index) => {
			const result = matrix.map((item) => item[index]);
			return rotations > 0
				? result.reverse()
				: result
		});
		matrix = rotations < 0
			? result.reverse()
			: result;
	}
	return matrix;
}
