import { typeOf, isPrimitive } from './misc.js';



/**
 * Copies an object in depth, removes references
 * @param {any} target 
 * @returns {any}
 */
 function deepCopy (target) {
	return (function copy (obj = target, hash = new WeakMap()) {
		if (isPrimitive(obj)) return obj;
		if (hash.has(obj)) return hash.get(obj);
		const result = obj instanceof Set
			? new Set(obj)
			: obj instanceof Map
				? new Map(Array.from(obj, ([key, val]) => [key, copy(val, hash)]))
				: obj instanceof Date
					? new Date(obj)
					: obj instanceof RegExp
						? new RegExp(obj.source, obj.flags)
						: obj.constructor
							? new obj.constructor()
							: Object.create(null);
		hash.set(obj, result);
		return Object.assign(result, ...Object.entries(obj).map(([key, val]) => ({ [key]: copy(val, hash) })));
	})();
}


/**
 * Compares objects in depth
 * @param  {...any} values 
 * @returns {boolean}
 */
export function deepCompare (...values) {
	const first = values[0];
	const type = typeOf(first);
	for (let i = 1; i < values.length; i++) {
		const value = values[i];
		if (type !== typeOf(value)) return false;
		switch (type) {
			case 'Object':
				return Object.entries(first).every(([key, val]) => deepCompare(val, value[key]));
			case 'Array':
				return first.every((val, idx) => deepCompare(val, value[idx]));
			case 'Map':
				return [...first].every(([key, val]) => deepCompare(val, value.get(key)));
			case 'Set':
				return [...first].every(([key, val]) => deepCompare(val, [...value][key]));
		}
		return first === value;
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
					target[key] = target.hasOwnProperty(key)
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
	return result;
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
		const key = keys.pop();
		const value = deepExtract(target, ...keys);
		switch (typeOf(value)) {
			case 'Object':
				removed.set([...keys, key], value[key]);
				delete value[key];
				break;
			case 'Array':
				removed.set([...keys, key], value.splice(key, 1)[0]);
				break;
			case 'Map':
				removed.set([...keys, key], value.get(key));
				value.delete(key);
				break;
			case 'Set':
				removed.set([...keys, key], [...value][key]);
				value.delete([...value][key]);
		}
	}
	return removed;
}


/**
 * Recurses through an object
 * @param {any} target 
 * @param {Function} callback 
 * @param {Function} check optional
 * @returns {any[]}
 */
export function deepRecurse (target, callback, check = () => true) {
	function loop (trgt = target, keys = []) {
		const result = [];
		function next (key, value, stop = false) {
			const next = [...keys, key];
			if (check(value, next)) {
				const callbackResult = callback(value, next);
				if (callbackResult == null) result.push(callbackResult);
				if (!stop) result.push(...loop(value, next));
			}
		}
		switch (typeOf(trgt)) {
			case 'Object':
				Object.entries(trgt).forEach(([key, value]) => next(key, value));
				break;
			case 'Array':
				trgt.forEach((value, index) => next(index, value));
				break;
			case 'Map':
				[...trgt].forEach(([key, value]) => next(key, value));
				break;
			case 'Set':
				[...trgt].forEach((value, index) => next(index, value));
				break;
			default:
				next(keys.at(-1), trgt, true);
		}
		return result;
	}
	return loop();
}


/**
 * Finds indices of all matches of value
 * @param {any} target 
 * @param {any} value 
 * @returns {any[][]}
 */
export function deepFindIndices (target, value) {
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
