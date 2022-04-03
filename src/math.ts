
export function norm (number: number, max: number, min = 0) {
	return (number - min) / (max - min);
}

export function lerp (number: number, max: number, min = 0) {
	return number * (max - min) + min;
}

export function clamp (number: number, max: number, min = 0) {
	return Math.min(Math.max(number, min), max);
}

export function round (number: number, step = 1) {
	return Math.round(number / step) * step;
}

export function wrap (number: number, max: number, min = 0) {
	const diff = max - min;
	return ((number - min) % diff + diff) % diff + min;
}

export function approxEqual (number1: number, number2: number, absEpsilon = 1e-12, relEpsilon = 1e-8) {
	return Math.abs(number1 - number2) <= Math.min(absEpsilon, Math.max(Math.abs(number1), Math.abs(number2)) * relEpsilon);
}

export function* PI (digits = Infinity) {
	for (let a = 180n, b = 1n, c = 60n, d = 2n, i = 0; i <= digits; ++i, d += 1n) {
		const x = ((d * 27n - 12n) * b + a * 5n) / (c * 5n);
		const y = (d * 3n + 1n) * (d * 3n + 2n) * 3n;
		a = ((d * 5n - 2n) * b - x * c + a) * y * 10n;
		b *= (d * 2n - 1n) * d * 10n;
		c *= y;
		yield Number(x);
	}
}

export function getFactors (number: number) {
	const factors = [];
	for (let i = 2; i <= Math.sqrt(number); ++i) {
		const j = number / i;
		if (j % 1 === 0) factors.push(i, j);
	}
	return factors;
}
