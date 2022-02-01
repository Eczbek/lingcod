
import { spliceString } from './string.js';


/**
 * norm
 * @param {number} number 
 * @param {number} max 
 * @param {number} min optional parameter
 * @returns {number}
 */
export const norm = (number, max, min = 0) => (number - min) / (max - min);

/**
 * lerp
 * @param {number} number 
 * @param {number} max 
 * @param {number} min optional parameter
 * @returns {number}
 */
export const lerp = (number, max, min = 0) => number * (max - min) + min;

/**
 * clamp
 * @param {number} number 
 * @param {number} max 
 * @param {number} min optional parameter
 * @returns {number}
 */
export const clamp = (number, max, min = 0) => Math.min(Math.max(number, min), max);

/**
 * round
 * @param {number} number 
 * @param {number} step optional parameter
 * @returns {number}
 */
export const round = (number, step = 1) => Math.round(number / step) * step;

/**
 * Wraps number between min and max
 * @param {number} number 
 * @param {number} max 
 * @param {number} min optional parameter
 * @returns {number}
 */
export const wrap = (number, max, min = 0) => {
	const diff = max - min;
	return ((number - min) % diff + diff) % diff + min;
}

/**
 * Checks if number is prime
 * @param {number} number 
 * @returns {boolean}
 */
export const isPrime = (number) => {
	for (let i = 2; i <= Math.sqrt(number); ++i) {
		if (number % i === 0) return false;
	}
	return number > 1;
}

/**
 * Checks if two numbers are approximately equal
 * @param {number} number1 
 * @param {number} number2 
 * @param {number} absEpsilon optional parameter
 * @param {number} relEpsilon optional parameter
 * @returns {boolean}
 */
export const approxEqual = (number1, number2, absEpsilon = 1e-12, relEpsilon = 1e-8) => Math.abs(number1 - number2) <= Math.min(absEpsilon, Math.max(Math.abs(number1), Math.abs(number2)) * relEpsilon);

/**
 * Calculates PI to specified digits
 * @param {number} digits optional parameter
 * @returns {string}
 */
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

export const getDenominators = (number) => {
	const denominators = [];
	for (let i = 2; i < Math.sqrt(number); ++i) {
		const j = number / i;
		if (j % 1 === 0) denominators.push(i, j);
	}
	return denominators;
}

export class Point {
	static compare (...points) {
		const [first, ...rest] = points;
		return rest.every(({ x, y }) => first.x === x && first.y === y);
	}

	constructor (x, y) {
		this.x = x;
		this.y = y;
	}
}

export class Line {
	static getIntersections (...lines) {
		const intersections = [];
		lines.forEach(({ slope: slope1, offset: offset1 }, index1) => lines.forEach(({ slope: slope2, offset: offset2 }, index2) => {
			if (index1 === index2) return;
			const { x: s1x, y: s1y } = new Point(0, offset1);
			const { x: e1x, y: e1y } = new Point(1, offset1 + slope1);
			const { x: s2x, y: s2y } = new Point(0, offset2);
			const { x: e2x, y: e2y } = new Point(1, offset2 + slope2);
			const a = (s1x - e1x) * (s2y - e2y) - (s1y - e1y) * (s2x - e2x);
			if (!a) return;
			const b = (s1x * e1y - s1y * e1x);
			const c = (s2x * e2y - s2y * e2x);
			const p1 = new Point((b * (s2x - e2x) - c * (s1x - e1x)) / a, (b * (s2y - e2y) - c * (s1y - e1y)) / a);
			if (!intersections.some((p2) => Point.compare(p1, p2))) intersections.push(p1);
		}));
		return intersections;
	}

	static compare (...lines) {
		const [first, ...rest] = lines;
		return rest.every(({ slope, offset }) => first.slope === slope && first.offset === offset);
	}

	constructor (slope, offset = 0) {
		this.slope = slope;
		this.offset = offset;
	}

	containsPoint ({ x, y }) {
		return approxEqual(y, x * this.slope + this.offset);
	}
}
