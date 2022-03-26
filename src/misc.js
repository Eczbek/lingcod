
export function isIterable (value) {
	return typeOf(value?.[Symbol.iterator]) === 'Function';
}

export function isNullish (value) {
	return value == null;
}

export function isPrimitive (value) {
	return Object(value) !== value;
}

export function typeOf (value) {
	return isNullish(value) ? String(value) : value?.constructor?.name ?? 'Object';
}

export function attempt (callback, ...args) {
	try {
		return callback(...args);
	} catch {}
}

export function sleep (millis) {
	return new Promise((resolve) => setTimeout(resolve, millis));
}
