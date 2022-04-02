import { randInt } from './random.js';
export function compact(array) {
    return array.filter(() => true);
}
export function range(max, min = 0, step = 1) {
    const array = [];
    for (let i = min; i < max; i += step)
        array.push(i);
    return array;
}
export function fill(length, fillCallback) {
    const array = [];
    for (let i = 0; i < length; ++i)
        array.push(fillCallback(i));
    return array;
}
export function includesAll(array, values) {
    return values.every((value) => array.includes(value));
}
export function filterByOccurences(array, occurences, compareCallback = (value1, value2) => value1 === value2) {
    return array.filter((value1, index1) => array.filter((value2, index2) => index1 === index2 || compareCallback(value1, value2)).length === occurences);
}
export function group(array, getGroup, getValue = (value, index) => value) {
    return array.reduce((map, value, index) => {
        const group = getGroup(value, index);
        if (!map.has(group))
            map.set(group, []);
        map.get(group).push(getValue(value, index));
        return map;
    }, new Map());
}
export function chunk([...array], getChunkSize, overflow = false) {
    const chunked = [];
    while (true) {
        const size = getChunkSize(array[chunked.length], chunked.length);
        if (array.length < size && !overflow || !array.length)
            return chunked;
        chunked.push(array.splice(0, size));
    }
}
export function filterIndices(array, filterCallback) {
    const indices = [];
    for (let i = 0; i < array.length; ++i)
        if (filterCallback(array[i], i))
            indices.push(i);
    return indices;
}
export function findIndexOfSubarray(array, subarray, compareCallback = (value1, value2) => value1 === value2, wrap = false) {
    return array.findIndex((_, index1) => subarray.every((value, index2) => {
        const index = index1 + index2;
        return compareCallback(value, array[wrap ? index % array.length : index]);
    }));
}
export function findIndicesOfSubarray(array, subarray, compareCallback = (value1, value2) => value1 === value2, wrap = false) {
    return filterIndices(array, (_, index1) => subarray.every((value, index2) => {
        const index = index1 + index2;
        return compareCallback(value, array[wrap ? index % array.length : index]);
    }));
}
export function findEmptyIndices(array) {
    return filterIndices(array, (_, index) => !Object.hasOwn(array, index));
}
export function isSparse(array) {
    for (let i = 0; i < array.length; ++i)
        if (!Object.hasOwn(array, i))
            return true;
    return false;
}
export function swap(array, index1, index2) {
    [array[index1], array[index2]] = [array[index2], array[index1]];
    return array;
}
export function shuffle([...array]) {
    for (let i = array.length - 1; i > 0; --i)
        swap(array, i, randInt(i));
    return array;
}
