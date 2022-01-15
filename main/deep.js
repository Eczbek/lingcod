
import { typeOf, isPrimitive } from './misc.js';


/**
 * Copies an object in depth, removes references
 * @param {any} target 
 * @returns {any}
 */
export function deepCopy (target) {
	const hash = new Map();
	const result = (function copy (obj = target) {
		if (isPrimitive(obj)) return obj;
		if (hash.has(obj)) return hash.get(obj);
		const result = obj instanceof Set
			? new Set(obj)
			: obj instanceof Map
				? new Map([...obj])
				: obj instanceof Date
					? new Date(obj)
					: obj instanceof RegExp
						? new RegExp(obj.source, obj.flags)
						: obj.constructor
							? new obj.constructor()
							: Object.create(null);
		hash.set(obj, result);
		return Object.assign(result, ...Object.entries(obj).map(([key, val]) => ({ [key]: copy(val) })));
	})();
	hash.clear();
	return result;
}

/**
 * Compares objects in depth
 * @param  {...any} values 
 * @returns {boolean}
 */
export function deepCompare (target, ...values) {
	const type = typeOf(target);
	for (const value of values) {
		if (type !== typeOf(value)) return false;
		switch (type) {
			case 'Object':
				return Object.entries(target).every(([key, val]) => deepCompare(val, value[key]));
			case 'Array':
				return target.every((val, idx) => deepCompare(val, value[idx]));
			case 'Map':
				return [...target].every(([key, val]) => deepCompare(val, value.get(key)));
			case 'Set':
				return [...target].every(([key, val]) => deepCompare(val, [...value][key]));
		}
		return target === value;
	}
}

/**
 * Extends an object in depth
 * @param {any} target 
 * @param  {...any} extensions 
 * @returns {any}
 */
export function deepExtend (target, ...extensions) {
	const type = typeOf(target);
	for (const extension of extensions) {
		if (type !== typeOf(extension)) continue;
		switch (type) {
			case 'Object':
				for (const [key, val] of Object.entries(extension)) {
					target[key] = Object.hasOwn(target, key)
						? deepExtend(target[key], val)
						: val;
				}
				break;
			case 'Array':
				target.push(extension);
				break;
			case 'Map':
				for (const [key, val] of [...extension]) {
					target.set(key, target.has(key)
						? deepExtend(target.get(key), val)
						: val);
				}
				break;
			case 'Set':
				for (const val of [...extension]) {
					target.add(val);
				}
		}
	}
	return target;
}

/**
 * Extracts data from within an object
 * @param {any} target 
 * @param  {...any} keys 
 * @returns {any}
 */
export function deepExtract (target, ...paths) {
	const result = [];
	for (const keys of deepCopy(paths)) {
		if (keys.length < 1) result.push(target);
		const key = keys.shift();
		switch (typeOf(target)) {
			case 'Object':
			case 'Array':
				result.push(deepExtract(target[key], keys)[0]);
				break;
			case 'Map':
				result.push(deepExtract(target.get(key), keys)[0]);
				break;
			case 'Set':
				result.push(deepExtract([...target][key], keys)[0]);
		}
	}
	return paths.length === 1 ? result[0] : result;
}

/**
 * Removes data from object, returns removed data
 * @param {any} target 
 * @param  {...any[]} paths 
 * @returns {any[]}
 */
export function deepRemove (target, ...paths) {
	const removed = new Map();
	for (const keys of deepCopy(paths)) {
		const key = keys.at(-1);
		const value = deepExtract(target, ...keys.slice(0, -1));
		switch (typeOf(value)) {
			case 'Object':
				removed.set(keys, value[key]);
				delete value[key];
				break;
			case 'Array':
				removed.set(keys, value.splice(key, 1)[0]);
				break;
			case 'Map':
				removed.set(keys, value.get(key));
				value.delete(key);
				break;
			case 'Set':
				removed.set(keys, key);
				value.delete(key);
		}
	}
	return removed;
}

/**
 * Finds indices of all matches of value
 * @param {any} target 
 * @param {any} value 
 * @returns {any[][]}
 */
export function findDeepIndices (target, value) {
	const result = [];
	function loop (trgt = target, keys = []) {
		if (typeOf(value) === 'Function'
			? value(trgt, keys)
			: Deep.compare(trgt, value)) result.push(keys);
		function handle (key, value) {
			const nextKeys = [...keys, key];
			const nextLoop = loop(value, nextKeys);
			if (typeOf(nextLoop) === 'Array') return nextLoop;
		}
		switch (typeOf(trgt)) {
			case 'Object':
				Object.entries(trgt).forEach(([key, value]) => handle(key, value));
				break;
			case 'Array':
				trgt.forEach((value, index) => handle(index, value));
				break;
			case 'Map':
				[...trgt].forEach(([key, value]) => handle(key, value));
				break;
			case 'Set':
				[...trgt].forEach((value, index) => handle(index, value));
		}
	}
	loop();
	return result;
}
