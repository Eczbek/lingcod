export function isIterable(value: any): boolean {
	return typeof value?.[Symbol.iterator] === 'function';
}

export function isNullish(value: any): boolean {
	return value == null;
}

export function isPrimitive(value: any): boolean {
	return Object(value) !== value;
}

export function typeOf(value: any): string {
	return isNullish(value)
		? String(value)
		: value?.constructor?.name ?? 'Object';
}

export function attempt(callback: Function, otherwise: any): any {
	try {
		return callback();
	} catch {
		return otherwise;
	}
}

export function sleep(millis: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, millis));
}
