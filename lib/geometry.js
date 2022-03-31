
import { approxEqual } from './math.js';
import { findIndexOfSequence } from './array.js';


/**
 * Convert radians to degrees
 * @param {number} radians 
 * @returns {number}
 */
export function radiansToDegrees (radians) {
	return radians * 180 / Math.PI;
}

/**
 * Convert degrees to radians
 * @param {number} degrees 
 * @returns {number}
 */
export function degreesToRadians (degrees) {
	return degrees * Math.PI / 180;
}

export class Point {
	/**
	 * Check if points are equal
	 * @param  {...Point} points 
	 * @returns {boolean}
	 */
	static equal (...points) {
		const [first, ...rest] = points;
		return rest.every(({ x, y }) => first.x === x && first.y === y);
	}

	/**
	 * Create a point at these coordinates
	 * @param {number} x 
	 * @param {number} y 
	 */
	constructor (x, y) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Create copy of this point
	 * @returns {Point}
	 */
	copy () {
		return new Point(this.x, this.y);
	}
}

export class Line {
	/**
	 * Calculate points where lines/rays/segments intersect
	 * @param  {...(Line | Ray | Segment)} lines 
	 * @returns {Point[]}
	 */
	static intersections (...lines) {
		const points = [];
		lines.forEach(({ start: { x: sx1, y: sy1 }, end: { x: ex1, y: ey1 } }, index1) => lines.forEach(({ start: { x: sx2, y: sy2 }, end: { x: ex2, y: ey2 } }, index2) => {
			if (index1 === index2) return;
			const a = sx2 - ex2;
			const b = sx1 - ex1;
			const c = sy2 - ey2;
			const d = sy1 - ey1;
			const e = b * c - a * d;
			if (!e) return;
			const f = sx1 * ey1 - ex1 * sy1;
			const g = sx2 * ey2 - ex2 * sy2;
			const p = new Point((a * f - b * g) / e, (c * f - d * g) / e);
			if (!points.some((point) => Point.equal(p, point)) && lines[index1].containsPoint(p) && lines[index2].containsPoint(p)) points.push(p);
		}));
		return points;
	}

	/**
	 * Check if lines/rays/segments are parallel
	 * @param  {...(Line | Ray | Segment)} lines 
	 * @returns {boolean}
	 */
	static parallel (...lines) {
		const [first, ...rest] = lines;
		const firstSlope = first.slope();
		return rest.every((line) => approxEqual(firstSlope, line.slope()));
	}

	/**
	 * Check if lines are equal
	 * @param  {...Line} lines 
	 * @returns {boolean}
	 */
	static equal (...lines) {
		const [first, ...rest] = lines;
		return Line.parallel(...lines) && rest.every(({ end }) => first.containsPoint(end));
	}

	/**
	 * Create a line that passes through these points
	 * @param {Point} start 
	 * @param {Point} end 
	 */
	constructor (start, end) {
		this.start = start.copy();
		this.end = end.copy();
	}

	/**
	 * Create copy of this line
	 * @returns {Line}
	 */
	copy () {
		return new Line(this.start, this.end);
	}

	/**
	 * Calculate this line's slope
	 * @returns {number}
	 */
	slope () {
		return (this.start.y - this.end.y) / (this.start.x - this.end.x);
	}

	/**
	 * Calculate this line's angle in radians
	 * @returns {number}
	 */
	radians () {
		return (Math.atan2(this.start.y - this.end.y, this.start.x - this.end.x) + Math.PI) % (Math.PI * 2);
	}

	/**
	 * Calculate this line's angle in degrees
	 * @returns {number}
	 */
	degrees () {
		return radiansToDegrees(this.radians());
	}

	/**
	 * Check if this line passes through a point
	 * @param {Point} point 
	 * @returns {boolean}
	 */
	containsPoint ({ x, y }) {
		return approxEqual(y, x * this.slope() - this.start.x * this.slope() + this.start.y);
	}
}

export class Ray extends Line {
	/**
	 * Check if rays are equal
	 * @param  {...Ray} rays 
	 * @returns {boolean}
	 */
	static equal (...rays) {
		const [first, ...rest] = rays;
		return rest.every(({ start, end }) => Point.equal(first.start, start) && first.containsPoint(end));
	}

	/**
	 * Create a ray with a start point and a point to intersect
	 * @param {Point} start 
	 * @param {Point} end 
	 */
	constructor (start, end) {
		super(start, end);
	}

	/**
	 * Create a copy of this ray
	 * @returns {Ray}
	 */
	copy () {
		return new Ray(this.start, this.end);
	}

	/**
	 * Check if this ray passes through a point
	 * @param {Point} point 
	 * @returns {boolean}
	 */
	containsPoint ({ x, y }) {
		return approxEqual(y, x * this.slope() - this.start.x * this.slope() + this.start.y) && (this.end.x > this.start.x ? x >= this.start.x : x <= this.start.x) && (this.end.y > this.start.y ? y >= this.start.y : y <= this.start.y);
	}
}

export class Segment extends Line {
	/**
	 * Check if segments are equal
	 * @param  {...Segment} segments 
	 * @returns {boolean}
	 */
	static equal (...segments) {
		const [first, ...rest] = segments;
		return rest.every(({ start, end }) => Point.equal(first.start, start) && Point.equal(first.end, end) || Point.equal(first.start, end) && Point.equal(first.end, start));
	}

	/**
	 * Create a line segment
	 * @param {Point} start 
	 * @param {Point} end 
	 */
	constructor (start, end) {
		super(start, end);
	}

	/**
	 * Create a copy of this segment
	 * @returns {Segment}
	 */
	copy () {
		return new Segment(this.start, this.end);
	}

	/**
	 * Calculate this segment's length
	 * @returns {number}
	 */
	length () {
		return Math.hypot(this.start.x - this.end.x, this.start.y - this.end.y);
	}

	/**
	 * Check if this segment passes through a point
	 * @param {Point} point 
	 * @returns {boolean}
	 */
	containsPoint ({ x, y }) {
		return approxEqual(y, x * this.slope() - this.start.x * this.slope() + this.start.y) && (x >= this.start.x && x <= this.end.x || x >= this.end.x && x <= this.start.x) && (y >= this.start.y && y <= this.end.y || y >= this.end.y && y <= this.start.y);
	}
}

export class Polygon {
	/**
	 * Check if polygons are equal
	 * @param {...Polygon} polygons 
	 * @returns {boolean}
	 */
	static equal (...polygons) {
		const [first, ...rest] = polygons;
		const check = (points) => findIndexOfSequence(first.points, points, Point.equal, true) >= 0;
		return rest.every(({ points }) => check(points) || check([...points].reverse()));
	}

	/**
	 * Create polygon between points
	 * @param  {...Point} points 
	 */
	constructor (...points) {
		this.points = [...points].map((point) => point.copy());
	}

	/**
	 * Create a copy of this polygon
	 * @returns {Polygon}
	 */
	copy () {
		return new Polygon(...this.points);
	}

	/**
	 * Calculate this polygon's area
	 * @returns {number}
	 */
	area () {
		return Math.abs(this.points.reduce((area, { x, y }, index) => area + x * this.points.at(index - 1).y / 2 - y * this.points.at(index - 1).x / 2, 0));
	}

	/**
	 * Calculate this polygon's perimeter
	 * @returns {number}
	 */
	perimeter () {
		return this.points.reduce((length, point, index) => length + new Segment(point, this.points.at(index - 1)).length(), 0);
	}

	/**
	 * Check if this polygon contains a point
	 * @param {Point} point 
	 * @returns {boolean}
	 */
	containsPoint ({ x, y }) {
		return !!this.points.reduce((odd, { x: ix, y: iy }, index) => {
			const { x: jx, y: jy } = this.points.at(index - 1);
			return (iy < y && jy >= y || jy < y && iy >= y) && (ix <= x || jx <= x) ? odd ^ (y - iy) / (jy - iy) * (jx - ix) + ix < x : odd;
		}, 0) || this.points.some((point, index) => new Segment(point, this.points.at(index - 1)).containsPoint(new Point(x, y)));
	}
}

export class Rectangle extends Polygon {
	/**
	 * Create a rectangle between two points
	 * @param {Point} start 
	 * @param {Point} end 
	 */
	constructor (start, end) {
		super(start, end);
		this.width = Math.abs(this.points[0].x - this.points[1].x);
		this.height =  Math.abs(this.points[0].y - this.points[1].y);
	}

	/**
	 * Create a copy of this rectangle
	 * @returns {Rectangle}
	 */
	copy () {
		return new Rectangle(...this.points);
	}

	/**
	 * Calculate this rectangle's area
	 * @returns {number}
	 */
	area () {
		return this.width * this.height;
	}

	/**
	 * Calculate this rectangle's perimeter
	 * @returns {number}
	 */
	perimeter () {
		return this.width * 2 + this.height * 2;
	}

	/**
	 * Check if this rectangle contains a point
	 * @param {Point} point 
	 * @returns {boolean}
	 */
	containsPoint ({ x, y }) {
		const { x: sx, y: sy } = this.points[0];
		const { x: ex, y: ey } = this.points[1];
		return (x >= sx && x <= ex || x <= sx && x >= ex) && (y >= sy && y <= ey || y <= sy && y >= ey);
	}
}
