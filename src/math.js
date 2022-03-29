
/**
 * Normalize
 * @param {number} number 
 * @param {number} max 
 * @param {number} min 
 * @returns {number}
 */
export function norm (number, max, min = 0) {
	return (number - min) / (max - min);
}

/**
 * Interpolate linearly
 * @param {number} number 
 * @param {number} max 
 * @param {number} min 
 */
export function lerp (number, max, min = 0) {
	return number * (max - min) + min;
}

/**
 * Clamp
 * @param {number} number 
 * @param {number} max 
 * @param {number} min 
 * @returns {number}
 */
export function clamp (number, max, min = 0) {
	return Math.min(Math.max(number, min), max);
}

/**
 * Round
 * @param {number} number 
 * @param {number} step 
 * @returns {number}
 */
export function round (number, step = 1) {
	return Math.round(number / step) * step;
}

/**
 * Wrap number between min and max
 * @param {number} number 
 * @param {number} max 
 * @param {number} min 
 * @returns {number}
 */
export function wrap (number, max, min = 0) {
	const diff = max - min;
	return ((number - min) % diff + diff) % diff + min;
}

/**
 * Checks if number is prime
 * @param {number} number 
 * @returns {boolean}
 */
export function isPrime (number) {
	for (let i = 2; i <= Math.sqrt(number); ++i) if (number % i === 0) return false;
	return number > 1;
}

/**
 * Checks if two numbers are approximately equal
 * @param {number} number1 
 * @param {number} number2 
 * @param {number} absEpsilon 
 * @param {number} relEpsilon 
 * @returns {boolean}
 */
export function approxEqual (number1, number2, absEpsilon = 1e-12, relEpsilon = 1e-8) {
	return Math.abs(number1 - number2) <= Math.min(absEpsilon, Math.max(Math.abs(number1), Math.abs(number2)) * relEpsilon);
}

/**
 * Generates PI
 * @param {number} digits 
 * @yields {number}
 */
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

/**
 * Calculates factors
 * @param {number} number 
 * @returns {number[]}
 */
export function getFactors (number) {
	const factors = [];
	for (let i = 2; i <= Math.sqrt(number); ++i) {
		const j = number / i;
		if (j % 1 === 0) factors.push(i, j);
	}
	return factors;
}
