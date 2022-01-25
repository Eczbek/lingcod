
import { spliceString } from './string.js';


export const norm = (number, max, min = 0) => (number - min) / (max - min);

export const lerp = (number, max, min = 0) => number * (max - min) + min;

export const clamp = (number, max, min = 0) => Math.min(Math.max(number, min), max);

export const wrap = (number, max, min = 0) => {
	const diff = max - min;
	return ((number - min) % diff + diff) % diff + min;
}

export const isPrime = (number) => {
	for (let i = 2; i <= Math.sqrt(number); ++i) {
		if (number % i === 0) return false;
	}
	return number > 1;
}

export const isApproxEqual = (number1, number2, absEpsilon = 1e-12, relEpsilon = 1e-8) => Math.abs(number1 - number2) <= Math.min(absEpsilon, Math.max(Math.abs(number1), Math.abs(number2)) * relEpsilon);

export const pi = (digits = 5) => {
	let result = '';
	for (let a = 180n, b = 1n, c = 60n, d = 2n, i = 0; i <= digits; ++i, d += 1n) {
		const x = ((d * 27n - 12n) * b + a * 5n) / (c * 5n);
		const y = (d * 3n + 1n) * (d * 3n + 2n) * 3n;
		a = ((d * 5n - 2n) * b - x * c + a) * y * 10n;
		b *= (d * 2n - 1n) * d * 10n;
		c *= y;
		result += x;
	}
	return spliceString(result, 1, 0, '.');
}

// todo 2D geometry