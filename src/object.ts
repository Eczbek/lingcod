
import { typeOf, isPrimitive } from './misc.js';


export function isEmpty (object: Object): boolean {
	return !Object.keys(object).length;
}

export function filterByProps (objects: Object[], props: Object, compareCallback = (value1: any, value2: any) => value1 === value2): Object[] {
	return objects.filter((object: any) => Object.entries(props).every(([key, value]) => compareCallback(object[key], value)));
}

export function deepClone (value: any, depth = Infinity): any {
	const hash = new Map();
	const result = (function clone (object = value, currDepth = depth): any {
		if (--currDepth < 0 || isPrimitive(object)) return object;
		if (hash.has(object)) return hash.get(object);
		const copy = (() => {
			switch (object?.constructor?.name) {
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

export function deepCompare (value1: any, value2: any, depth = Infinity): boolean {
	if (--depth < 0) return true;
	const type = typeOf(value1);
	if (type !== typeOf(value2)) return false;
	switch (type) {
		case 'Object':
		case 'Array':
			return Object.entries(value1).every(([key, val]) => deepCompare(val, value2[key], depth));
		case 'Map':
			return [...value1].every(([key, val]) => deepCompare(val, value2.get(key), depth));
		case 'Set':
			return [...value1].every(([key, val]) => deepCompare(val, [[...value2][key]], depth));
	}
	return value1 === value2;
}

export function deepMerge (value1: any, value2: any, arrayReplace = false, depth = Infinity): any {
	const type = typeOf(value1);
	if (--depth < 0 || type !== typeOf(value2)) return value1;
	switch (type) {
		case 'Object':
			Object.entries(value2).forEach(([key, value]) => value1[key] = Object.hasOwn(value1, key) ? deepMerge(value1[key], value, arrayReplace, depth) : value);
			break;
		case 'Array':
			arrayReplace ? value2.forEach((value: any, index: number) => value1[index] = deepMerge(value1[index], value, arrayReplace, depth)) : value1.push(...value2);
			break;
		case 'Map':
			[...value2].forEach(([key, value]) => value1.set(key, value1.has(key) ? deepMerge(value1.get(key), value) : value));
			break;
		case 'Set':
			[...value2].forEach((value) => value1.add(value));
			break;
	}
	return value1;
}

export function extract (value: any, path: any[]): any {
	if (!path.length) return value;
	const [key, ...keys] = path;
	switch (typeOf(value)) {
		case 'Object':
		case 'Array':
			return extract(value[key], keys);
		case 'Map':
			return extract(value.get(key), keys);
		case 'Set':
			return extract(key, keys);
	}
	return value;
}

export function deepRemove (value: any, path: any[]): any {
	const key = path.at(-1);
	const object = extract(value, path.slice(0, -1));
	switch (typeOf(object)) {
		case 'Object':
			delete object[key];
			break;
		case 'Array':
			object.splice(key, 1)[0];
			break;
		case 'Map':
		case 'Set':
			object.delete(key);
			break;
	}
	return value;
}

export function recurse (value: any, callback: (value: any, path: any[]) => void, check = (value: any, path: any[]) => true): void {
	(function loop (object = value, keys: any[] = [], values = [value]) {
		function handle (key: any, value: any) {
			const path = [...keys, key];
			callback(value, path);
			if (!check(value, path) || isPrimitive(value) || values.includes(value)) return;
			values.push(value);
			loop(value, path, values);
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
				object.forEach((value: any) => handle(value, value));
				break;
		}
	})();
}

export function findPaths (value: any, findCallback: (value: any, path: any[]) => boolean, depth = Infinity): any[][] {
	const paths: any[] = [];
	recurse(value, (object, path) => {
		if (findCallback(object, path)) paths.push(path);
	}, (_, path) => path.length <= depth);
	return paths;
}

export function deepFreeze (value: any, depth = Infinity): any {
	recurse(Object.freeze(value), (value) => Object.freeze(value), (_, path) => path.length <= depth);
	return value;
}

export function deepCompact (value: any, depth = Infinity): any {
	findPaths(value, (item) => {
		switch (item?.constructor?.name) {
			case 'Object':
			case 'Array':
				return isEmpty(item);
			case 'Map':
			case 'Set':
				return ![...item].length;
		}
		return false;
	}, depth).forEach((path) => deepRemove(value, path));
	return value;
}
