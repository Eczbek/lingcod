
import { spliceString } from './string.js';
import { contentsAreEqual } from './array.js';


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
export const isApproxEqual = (number1, number2, absEpsilon = 1e-12, relEpsilon = 1e-8) => Math.abs(number1 - number2) <= Math.min(absEpsilon, Math.max(Math.abs(number1), Math.abs(number2)) * relEpsilon);

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

// 2D GEOMETRY IS UNFINISHED

export class Point {
	static compare (...points) {
		return points.every(({ x, y }) => x === points[0].x && y === points[0].y);
	}

	constructor (x, y) {
		this.x = x;
		this.y = y;
	}
}

export class Line {
	static compare (...lines) {
		return lines.every(({ start, end }) => Point.compare(start, lines[0].start) && Point.compare(end, lines[0].end));
	}

	static getIntersectPoints (...lines) {
		const points = [];
		lines.forEach(({ start: { x: sx1, y: sy1 }, end: { x: ex1, y: ey1 } }, index1) => lines.forEach(({ start: { x: sx2, y: sy2 }, end: { x: ex2, y: ey2 } }, index2) => {
			if (index1 === index2) return;
			const a = (sx1 - ex1) * (sy2 - ey2) - (sy1 - ey1) * (sx2 - ex2);
			if (!a) return;
			const b = (sx1 * ey1 - sy1 * ex1);
			const c = (sx2 * ey2 - sy2 * ex2);
			(points[index1] ??= []).push(new Point((b * (sx2 - ex2) - c * (sx1 - ex1)) / a, (b * (sy2 - ey2) - c * (sy1 - ey1)) / a));
		}));
		return points;
	}

	constructor (start, end) {
		this.start = start;
		this.end = end;
	}

	static areIntersecting (...lines) {
		return Line.getIntersectPoints(...lines).length > 0;
	}

	getLength () {
		return Math.hypot(Math.abs(this.start.x - this.end.x), Math.abs(this.start.y - this.end.y));
	}

	containsPoint (point) {
		// todo
	}
}

export class Angle {
	static compare (...angles) {
		return contentsAreEqual(angles.map((angle) => angle.getRadians()));
	}

	static toDegrees (radians) {
		return radians * 180 / Math.PI;
	}
	
	static toRadians (degrees) {
		return degrees * Math.PI / 180;
	}

	constructor (start, middle, end) {
		this.start = start;
		this.middle = middle;
		this.end = end;
	}

	getRadians () {
		const { x: sx, y: sy } = this.start;
		const { x: mx, y: my } = this.middle;
		const { x: ex, y: ey } = this.end;
		const a = Math.hypot(mx - sx, my - sy);
		const b = Math.hypot(mx - ex, my - ey);
		return Math.acos((a ** 2 + b ** 2 - Math.hypot(ex - sx, ey - sy) ** 2) / (a * b * 2));
	}

	getDegrees () {
		return Angle.radiansToDegrees(this.getRadians());
	}
}

export class Polygon {
	static compare (...polygons) {
		// todo
	}

	static getOverlapPoints (...polygons) {
		// todo
	}

	static areOverlapping (...polygons) {
		return Polygon.getOverlapPoints(...polygons).length > 0;
	}

	constructor (...points) {
		this.points = points;
	}

	getArea () {
		return Math.abs(this.points.reduce((area, point, idx) => area + point.x * this.points.at(idx - 1).y / 2 - this.points.at(idx - 1).x * point.y / 2, 0));
	}

	containsPoint (point) {
		// todo
	}
}

export class Ellipse {
	static compare (...ellipses) {
		// todo
	}

	constructor (center, width, height) {
		this.center = center;
		this.width = width;
		this.height = height;
	}

	getArea () {
		return this.width * this.height * Math.PI;
	}

	containsPoint (point) {
		// todo
	}
}
