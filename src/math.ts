export function norm(number: number, max: number, min = 0): number {
	return (number - min) / (max - min);
}

export function lerp(number: number, max: number, min = 0): number {
	return number * (max - min) + min;
}

export function clamp(number: number, max: number, min = 0): number {
	return Math.min(Math.max(number, min), max);
}

export function round(number: number, step = 1): number {
	return Math.round(number / step) * step;
}

export function wrap(number: number, max: number, min = 0): number {
	const diff = max - min;
	return ((number - min) % diff + diff) % diff + min;
}

export function approxEqual(number1: number, number2: number): boolean {
	return Math.abs(number1 - number2) < Number.EPSILON;
}

export function* PI(digits = Infinity): Generator<number> {
	for (let a = 180n, b = 1n, c = 60n, d = 2n, i = 0; i <= digits; ++i, d += 1n) {
		const x = ((d * 27n - 12n) * b + a * 5n) / (c * 5n);
		const y = (d * 3n + 1n) * (d * 3n + 2n) * 3n;
		a = ((d * 5n - 2n) * b - x * c + a) * y * 10n;
		b *= (d * 2n - 1n) * d * 10n;
		c *= y;
		yield Number(x);
	}
}
