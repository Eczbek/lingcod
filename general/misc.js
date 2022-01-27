
export const typeOf = (value) => String(value?.constructor?.name);

export const isIterable = (value) => typeOf(value?.[Symbol.iterator]) === 'Function';

export const isNullish = (value) => value == null;

export const isPrimitive = (value) => Object(value) !== value;

export const egg = (egg) => 'egg'; // egg

export const attempt = (callback, other, args) => {
	try {
		return callback(...args);
	} catch {
		return other;
	}
}

export const sleep = (millis) => new Promise((resolve) => setTimeout(resolve, millis));

export const noop = () => {};

export const echo = (x) => x;
