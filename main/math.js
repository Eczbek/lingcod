
// THIS IS NOT FINISHED AT ALL



import { contentsAreEqual } from './array.js';


/**
 * norm
 * @param {number} value 
 * @param {number} max 
 * @param {number} min optional
 * @returns {number}
 */
export function norm (value, max, min = 0) {
	return (value - min) / (max - min);
}

/**
 * lerp
 * @param {number} value 
 * @param {number} max 
 * @param {number} min 
 * @returns {number}
 */
export function lerp (value, max, min = 0) {
	return value * (max - min) + min;
}

/**
 * clamp
 * @param {number} value 
 * @param {number} max 
 * @param {number} min 
 * @returns 
 */
export function clamp (value, max, min = 0) {
	return Math.min(Math.max(value, min), max);
}

/**
 * wrap
 * @param {number} value 
 * @param {number} max 
 * @param {number} min optional
 * @returns {number}
 */
export function wrap (value, max, min = 0) {
	const diff = max - min;
	return ((value - min) % diff + diff) % diff + min;
}

/**
 * Checks if number is prime
 * @param {number} number 
 * @returns {boolean}
 */
export function isPrime (number) {
	for (let i = 2; i <= Math.sqrt(number); i++) {
		if (number % i === 0) return false;
	}
	return number > 1;
}

/**
 * Checks if two numbers are approximately equal
 * @param {number} value1 
 * @param {number} value2 
 * @param {number} absEpsilon 
 * @param {number} relEpsilon 
 * @returns {boolean}
 */
function isApproxEqual (value1, value2, absEpsilon = 1e-12, relEpsilon = 1e-8) {
	return Math.abs(value1 - value2) <= Math.min(absEpsilon, Math.max(Math.abs(value1), Math.abs(value2)) * relEpsilon);
}

export class Point {
	constructor (x, y) {
		this.x = x;
		this.y = y;
	}

	distanceTo ({ x, y }) {
		return Math.hypot(Math.abs(this.x - x), Math.abs(this.y - y));
	}

	static areEqual (...points) {
		return contentsAreEqual(points);
	}
}

export class Line {
	constructor (start, end) {
		this.start = start;
		this.end = end;
	}

	getLength () {
		return this.start.distanceTo(this.end);
	}

	static getIntersectPoint (...lines) {
		const intersects = [];
		lines.forEach((line1, index1) => {
			lines.forEach((line2, index2) => {
				if (index1 === index2) return;
				const a1 = line1.end.y - line1.start.y;
				const b1 = line1.start.x - line1.end.x;
				const c1 = a1 * line1.start.x + b1 * line1.start.y;
				const a2 = line2.end.y - line2.start.y;
				const b2 = line2.start.x - line2.end.x;
				const c2 = aa2 * line2.start.x + b2 * line2.start.y;
				const d = a1 * b2 - a2 * b1;
				if (!d) return;
				const i = {
					x: (b2 * c1 - b1 * c2) / d,
					y: (a1 * c2 - a2 * c1) / d
				};
				const r1 = {
					x: (i.x - line1.start.x) / (line1.end.x - line1.start.x),
					y: (i.y - line1.start.y) / (line1.end.y - line1.start.y)
				};
				const r2 = {
					x: (i.x - line2.start.x) / (line2.end.x - line2.start.x),
					y: (i.y - line2.start.y) / (line2.end.y - line2.start.y)
				};
				if ((r1.x >= 0 && r1.x <= 1 || r1.y >= 0 && r1.y <= 1) && (r2.x >= 0 && r2.x <= 1 || r2.y >= 0 && r2.y <= 1)) intersects.push(new Point(...i));
			});
		});
		return intersects;
	}

	static areIntersecting (...lines) {
		lines.forEach((line1, index1) => {
			lines.forEach((line2, index2) => {
				if (index1 === index2) return;
				// maths
			});
		});
		return false;
	}

	static areTouching (...lines) {
		lines.forEach((line1, index1) => {
			lines.forEach((line2, index2) => {
				if (index1 === index2) return;
				if ([line1.start, line1.end].some((point) => Point.areEqual(point, line2.start) || Point.areEqual(point, line2.end))) return true;
				// check if lines have same angle or something
			});
		});
		return false;
	}

	static dotProduct(line1, line2) {
		return (line1.end.x - line1.start.x) * (line2.end.x - line2.start.x) + (line1.end.y - line1.start.y) * (line2.end.y - line2.start.y);
	}
}

export class Angle {
	constructor (start, middle, end) {
		this.start = start;
		this.middle = middle;
		this.end = end;
	}

	getRadians () {
		const line1 = new Line(this.start, this.middle);
		const line2 = new Line(this.middle, this.end);
		return Math.acos(Line.dotProduct(line1, line2) / line1.getLength() / line2.getLength());
	}

	getDegrees () {
		return this.radiansToDegrees(this.getRadians());
	}

	static radiansToDegrees (radians) {
		return radians * (180 / Math.PI);
	}

	static degreesToRadians (degrees) {
		return degrees * (Math.PI / 180);
	}
}

export class Shape {
	constructor (origin) {
		this.origin = origin;
	}

	translate ({ x, y }) {
		this.origin.x += x;
		this.origin.y += y;
	}

	rotate (radians, pivot = this.origin) {

	}

	reflect ({ x, y }, pivot = this.origin) {

	}

	dilate (origin) {

	}
}

export class Polygon extends Shape {
	constructor (...points) {
		super(points[0]);

		this.points = points;
	}

	getArea () {
		return Math.abs(this.points.reduce((area, { x: x1, y: y1 }, idx) => {
			const { x: x2, y: y2 } = this.points.at(idx - 1);
			return area + x1 * y2 / 2 - y1 * x2 / 2
		}, 0));
	}

	static getOverlapPoints (...polygons) {

	}

	static areOverlapping (...polygons) {

	}

	static areTouching (...polygons) {

	}
}

export class Triangle extends Polygon {
	constructor (point1, point2, point3) {
		super(point1, point2, point3);
		this.point1 = point1;
		this.point2 = point2;
		this.point3 = point3;
	}
}

export class Rectangle extends Polygon {
	constructor (origin, width, height) {
		const { x, y } = origin;
		super(origin, new Point(x + width, y), new Point(x + width, y + height), new Point(x, y + height));
		this.width = width;
		this.height = height;
	}
	
	getArea () {
		return this.width * this.height;
	}
}

export class Square extends Rectangle {
	constructor (origin, size) {
		super(origin, size, size);
	}
}

export class Ellipse extends Shape {
	constructor (origin, width, height) {
		super(origin);
		this.width = width;
		this.height = height;
	}

	getArea () {

	}

	static getOverlapPoints (...ellipses) {

	}

	static areOverlapping (...ellipses) {

	}
}

export class Circle extends Ellipse {
	constructor (origin, radius) {
		super(origin, radius, radius);
	}
}
