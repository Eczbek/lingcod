
export function isIterable (value: any) {
	return typeof value?.[Symbol.iterator] === 'function';
}

export function isNullish (value: any) {
	return value == null;
}

export function isPrimitive (value: any) {
	return Object(value) !== value;
}

export function typeOf (value: any): string {
	return isNullish(value) ? String(value) : value?.constructor?.name ?? 'Object';
}

export function attempt (callback: Function, otherwise: any) {
	try {
		return callback();
	} catch {
		return otherwise;
	}
}

export function sleep (millis: number) {
	return new Promise((resolve) => setTimeout(resolve, millis));
}
