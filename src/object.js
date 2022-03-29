
import { typeOf, isPrimitive } from './misc.js';


export function isEmpty (object) {
	return !Object.keys(object).length;
}

export function filterByProps (objects, props, compareCallback = (a, b) => a === b) {
	return objects.filter((object) => Object.entries(props).every(([key, value]) => compareCallback(object[key], value)));
}

export function deepClone (target, depth = Infinity) {
	const hash = new Map();
	const result = (function copy (object = target, currDepth = depth) {
		if (--currDepth < 0 || isPrimitive(object)) return object;
		if (hash.has(object)) return hash.get(object);
		const copy = (function clone () {
			switch (typeOf(object)) {
				case 'Map':
					return new Map([...object]);
				case 'Set':
					return new Set(object);
				case 'Date':
					return new Date(object);
				case 'RegExp':
					return new RegExp(object.source, object.flags);
			}
			return object.constructor?.() ?? Object.create(null);
		})();
		hash.set(object, copy);
		return Object.assign(copy, ...Object.entries(object).map(([key, value]) => ({ [key]: clone(value, currDepth) })));
	})();
	hash.clear();
	return result;
}

export function deepCompare (target, value, depth = Infinity) {
	if (--depth < 0) return true;
	const type = typeOf(target);
	if (type !== typeOf(value)) return false;
	switch (type) {
		case 'Object':
		case 'Array':
			return Object.entries(target).every(([key, val]) => deepCompare(val, value[key], depth));
		case 'Map':
			return [...target].every(([key, val]) => deepCompare(val, value.get(key), depth));
		case 'Set':
			return [...target].every(([key, val]) => deepCompare(val, [[...value][key]], depth));
	}
	return target === value;
}

export function deepExtend (target, extension, arrayReplace = false, depth = Infinity) {
	const type = typeOf(target);
	if (--depth < 0 || type !== typeOf(extension)) return target;
	switch (type) {
		case 'Object':
			Object.entries(extension).forEach(([key, value]) => target[key] = Object.hasOwn(target, key) ? deepExtend(target[key], value, arrayReplace, depth) : value);
			break;
		case 'Array':
			arrayReplace ? extension.forEach((item, index) => target[index] = deepExtend(target[index], item, arrayReplace, depth)) : target.push(...extension);
			break;
		case 'Map':
			[...extension].forEach(([key, value]) => target.set(key, target.has(key) ? deepExtend(target.get(key), value) : value));
			break;
		case 'Set':
			[...extension].forEach((item) => target.add(item));
			break;
	}
	return target;
}

export function extract (target, path) {
	if (!path.length) return target;
	const [key, ...keys] = path;
	switch (typeOf(target)) {
		case 'Object':
		case 'Array':
			return extract(target[key], keys);
		case 'Map':
			return extract(target.get(key), keys);
		case 'Set':
			return extract(key, keys);
	}
	return target;
}

export function deepRemove (target, path) {
	const key = path.at(-1);
	const value = extract(target, path.slice(0, -1));
	switch (typeOf(value)) {
		case 'Object':
			delete value[key];
			break;
		case 'Array':
			value.splice(key, 1)[0];
			break;
		case 'Map':
		case 'Set':
			value.delete(key);
			break;
	}
	return path;
}

export function recurse (target, callback, check = () => true) {
	(function loop (object = target, keys = [], values = [target]) {
		function handle (key, value) {
			const currKeys = [...keys, key];
			callback(value, currKeys);
			if (!check(value, currKeys) || isPrimitive(value) || values.includes(value)) return;
			values.push(value);
			loop(value, currKeys, values);
		}
		switch (typeOf(object)) {
			case 'Object':
			case 'Array':
				Object.entries(object).forEach(([key, value]) => handle(key, value));
				break;
			case 'Map':
				[...object].forEach(([key, value]) => handle(key, value));
				break;
			case 'Set':
				object.forEach((item) => handle(item, item));
				break;
		}
	})();
}

export function findPaths (target, value, compareCallback = (a, b) => a === b, depth = Infinity) {
	const paths = [];
	recurse(target, (item, path) => {
		if (compareCallback(value, item)) paths.push(path);
	}, (_, indices) => indices.length <= depth);
	return paths;
}

export function deepFreeze (target, depth = Infinity) {
	recurse(Object.freeze(target), (item) => Object.freeze(item), (_, indices) => indices.length <= depth);
	return target;
}
