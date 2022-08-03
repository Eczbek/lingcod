import { typeNameOf, isPrimitive } from './misc.js';


export function isEmpty(object: Object): boolean {
	return !Object.keys(object).length;
}

export function filterByProps(objects: Object[], properties: Object, compareCallback = (value1: any, value2: any) => value1 === value2): Object[] {
	return objects.filter((object: any) => Object.entries(properties).every(([key, value]) => compareCallback(object[key], value)));
}

export function deepClone(object: any, depth = Infinity): any {
	const hash = new Map();
	return (function clone(currentObject = object, currentDepth = depth): any {
		if (--currentDepth < 0 || isPrimitive(currentObject))
			return currentObject;
		if (hash.has(currentObject))
			return hash.get(currentObject);
		const copy = (() => {
			switch (typeNameOf(currentObject)) {
				case 'Map':
					return new Map([...currentObject]);
				case 'Set':
					return new Set(currentObject);
				case 'Date':
					return new Date(currentObject);
				case 'RegExp':
					return new RegExp(currentObject.source, currentObject.flags);
			}
			return currentObject.constructor?.() ?? Object.create(null);
		})();
		hash.set(currentObject, copy);
		return Object.assign(copy, ...Object.entries(currentObject).map(([key, value]) => ({ [key]: clone(value, currentDepth) })));
	})();
}

export function deepCompare(object1: any, object2: any, depth = Infinity): boolean {
	const hash = new Map();
	return (function compare(currentObject1 = object1, currentObject2 = object2, currentDepth = depth) {
		if (--currentDepth < 0 || hash.get(currentObject1) === currentObject2)
			return true;
		if (isPrimitive(currentObject1))
			return currentObject1 === currentObject2;
		const type = typeNameOf(currentObject1);
		if (type !== typeNameOf(currentObject2))
			return false;
		hash.set(currentObject1, currentObject2);
		switch (type) {
			case 'Object':
				return Object.entries(currentObject1).every(([key, value]) => compare(value, currentObject2[key], currentDepth));
			case 'Array':
				return currentObject1.every((value: any, index: number) => compare(value, currentObject2[index], currentDepth));
			case 'Map':
				return [...currentObject1].every(([key, value]) => compare(value, currentObject2.get(key), currentDepth));
			case 'Set':
				return [...currentObject1].every((value, index, array) => compare(value, array[index], currentDepth));
		}
	})();
}

export function deepMerge(object1: any, object2: any, overrideArrayIndices = false, depth = Infinity): void {
	const hash = new Map();
	(function merge(currentObject1 = object1, currentObject2 = object2, currentDepth = depth) {
		const type = typeNameOf(currentObject1);
		if (--currentDepth < 0 && hash.get(currentObject1) !== currentObject2 && type === typeNameOf(currentObject2)) {
			if (!isPrimitive(currentObject1))
				hash.set(currentObject1, currentObject2);
			switch (type) {
				case 'Object':
					Object.entries(currentObject2).forEach(([key, value]) => currentObject2[key] = Object.hasOwn(currentObject1, key)
						? merge(currentObject1[key], value, currentDepth)
						: value);
					break;
				case 'Array':
					if (overrideArrayIndices)
						currentObject2.forEach((value: any, index: number) => currentObject1[index] = merge(currentObject1[index], value, currentDepth));
					else
						currentObject1.push(...currentObject2);
					break;
				case 'Map':
					[...currentObject2].forEach(([key, value]) => currentObject1.set(key, currentObject1.has(key)
						? merge(currentObject1.get(key), value, currentDepth)
						: value));
					break;
				case 'Set':
					[...currentObject2].forEach((value) => currentObject1.add(value));
					break;
			}
		}
		return currentObject1;
	})();
}

export function deepExtract(value: any, path: any[]): any {
	if (path.length) {
		const [key, ...keys] = path;
		switch (typeNameOf(value)) {
			case 'Object':
			case 'Array':
				return deepExtract(value[key], keys);
			case 'Map':
				return deepExtract(value.get(key), keys);
			case 'Set':
				return deepExtract(key, keys);
		}
	}
	return value;
}

export function deepRemove(value: any, path: any[]): any {
	const key = path.at(-1);
	const object = deepExtract(value, path.slice(0, -1));
	switch (typeNameOf(object)) {
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

export function recurse(object: any, callback: (value: any, path: any[]) => void, check = (value: any, path: any[]) => true, allowRecursion = false): void {
	const hash = new Set();
	(function loop(currentObject = object, keys: any[] = [], values = [object]) {
		function handle (key: any, value: any) {
			const path = [...keys, key];
			callback(value, path);
			if (!allowRecursion && hash.has(value) || !check(value, path) || isPrimitive(value) || values.includes(value))
				return;
			hash.add(value);
			values.push(value);
			loop(value, path, values);
		}
		switch (typeNameOf(currentObject)) {
			case 'Object':
			case 'Array':
				Object.entries(currentObject).forEach(([key, value]) => handle(key, value));
				break;
			case 'Map':
				[...currentObject].forEach(([key, value]) => handle(key, value));
				break;
			case 'Set':
				currentObject.forEach((value: any) => handle(value, value));
				break;
		}
	})();
}

export function findPaths(value: any, findCallback: (value: any, path: any[]) => boolean, depth = Infinity): any[][] {
	const paths: any[] = [];
	recurse(value, (object, path) => {
		if (findCallback(object, path))
			paths.push(path);
	}, (_, path) => path.length <= depth);
	return paths;
}

export function deepFreeze(value: any, depth = Infinity): any {
	recurse(Object.freeze(value), (value) => Object.freeze(value), (_, path) => path.length <= depth);
	return value;
}

export function deepCompact(value: any, depth = Infinity): any {
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
