
export function typeOf (value) {
	return String(value?.constructor?.name);
}

export function isIterable (value) {
	return typeOf(value?.[Symbol.iterator]) === 'Function';
}

export function isNullish (value) {
	return value == null;
}

export function isPrimitive (value) {
	return Object(value) !== value;
}

export function attempt (callback, ...args) {
	try {
		return callback(...args);
	} catch {}
}

export function sleep (millis) {
	return new Promise((resolve) => setTimeout(resolve, millis));
}
