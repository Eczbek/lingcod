import { wrap } from './math.js';
export function createMatrix(dimensions, fillCallback = (indices) => 0) {
    return (function loop([dimension, ...nextDimensions] = dimensions, prevIndices = []) {
        const matrix = [];
        for (let i = 0; i < dimension; ++i) {
            const indices = [...prevIndices, i];
            matrix.push(nextDimensions.length ? loop(nextDimensions, indices) : fillCallback(indices));
        }
        return matrix;
    })();
}
export function wrapMatrix(array, dimensions) {
    let i = 0;
    return createMatrix(dimensions, () => array[i++]);
}
export function isRegular(matrix, depth = Infinity) {
    return --depth < 0 || !Array.isArray(matrix) || matrix.every((item) => item?.length === matrix[0]?.length && isRegular(item, depth));
}
export function getDimensions(matrix) {
    const dims = [matrix.length];
    if (isRegular(matrix, 1))
        dims.push(...getDimensions(matrix[0]));
    return dims;
}
export function rotateMatrix(matrix, rotations = 0) {
    rotations = wrap(Math.abs(rotations), 3, -1);
    for (let i = 0; i < Math.abs(rotations); ++i) {
        const result = matrix[0].map((_, index) => {
            const result = matrix.map((item) => item[index]);
            return rotations > 0 ? result.reverse() : result;
        });
        matrix = rotations < 0 ? result.reverse() : result;
    }
    return matrix;
}
