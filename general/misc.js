
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

export function attempt (callback, other, args) {
	try {
		return callback(...args);
	} catch {
		return other;
	}
}

export function sleep (millis) {
	return new Promise((resolve) => setTimeout(resolve, millis));
}

export function noop () {}

export function echo (...args) {
	return args.length < 2 ? args[0] : args;
}
