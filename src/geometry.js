
import { approxEqual } from './math.js';
import { findIndexOfSequence } from './array.js';


export function radiansToDegrees (radians) {
	return radians * 180 / Math.PI;
}

export function degreesToRadians (degrees) {
	return degrees * Math.PI / 180;
}

export class Point {
	static equal (...points) {
		const [first, ...rest] = points;
		return rest.every(({ x, y }) => first.x === x && first.y === y);
	}

	constructor (x, y) {
		this.x = x;
		this.y = y;
	}

	copy () {
		return new Point(this.x, this.y);
	}
}

export class Line {
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

	static parallel (...lines) {
		const [first, ...rest] = lines;
		const firstSlope = first.slope();
		return rest.every((line) => approxEqual(firstSlope, line.slope()));
	}

	static equal (...lines) {
		const [first, ...rest] = lines;
		return Line.parallel(...lines) && rest.every(({ end }) => first.containsPoint(end));
	}

	constructor (start, end) {
		this.start = start.copy();
		this.end = end.copy();
	}

	copy () {
		return new Line(this.start, this.end);
	}

	slope () {
		return (this.start.y - this.end.y) / (this.start.x - this.end.x);
	}

	radians () {
		return (Math.atan2(this.start.y - this.end.y, this.start.x - this.end.x) + Math.PI) % (Math.PI * 2);
	}

	degrees () {
		return radiansToDegrees(this.radians());
	}

	containsPoint ({ x, y }) {
		return approxEqual(y, x * this.slope() - this.start.x * this.slope() + this.start.y);
	}
}

export class Ray extends Line {
	static equal (...rays) {
		const [first, ...rest] = rays;
		return rest.every(({ start, end }) => Point.equal(first.start, start) && first.containsPoint(end));
	}

	constructor (start, end) {
		super(start, end);
	}

	copy () {
		return new Ray(this.start, this.end);
	}

	containsPoint ({ x, y }) {
		return approxEqual(y, x * this.slope() - this.start.x * this.slope() + this.start.y) && (this.end.x > this.start.x ? x >= this.start.x : x <= this.start.x) && (this.end.y > this.start.y ? y >= this.start.y : y <= this.start.y);
	}
}

export class Segment extends Line {
	static equal (...segments) {
		const [first, ...rest] = segments;
		return rest.every(({ start, end }) => Point.equal(first.start, start) && Point.equal(first.end, end) || Point.equal(first.start, end) && Point.equal(first.end, start));
	}

	constructor (start, end) {
		super(start, end);
	}

	copy () {
		return new Segment(this.start, this.end);
	}

	length () {
		return Math.hypot(this.start.x - this.end.x, this.start.y - this.end.y);
	}

	containsPoint ({ x, y }) {
		return approxEqual(y, x * this.slope() - this.start.x * this.slope() + this.start.y) && (x >= this.start.x && x <= this.end.x || x >= this.end.x && x <= this.start.x) && (y >= this.start.y && y <= this.end.y || y >= this.end.y && y <= this.start.y);
	}
}

export class Polygon {
	static equal (...polygons) {
		const [first, ...rest] = polygons;
		const check = (points) => findIndexOfSequence(first.points, points, Point.equal, true) >= 0;
		return rest.every(({ points }) => check(points) || check([...points].reverse()));
	}

	constructor (...points) {
		this.points = [...points].map((point) => point.copy());
	}

	copy () {
		return new Polygon(...this.points);
	}

	area () {
		return Math.abs(this.points.reduce((area, { x, y }, index) => area + x * this.points.at(index - 1).y / 2 - y * this.points.at(index - 1).x / 2, 0));
	}

	perimeter () {
		return this.points.reduce((length, point, index) => length + new Segment(point, this.points.at(index - 1)).length(), 0);
	}

	containsPoint ({ x, y }) {
		return !!this.points.reduce((odd, { x: ix, y: iy }, index) => {
			const { x: jx, y: jy } = this.points.at(index - 1);
			return (iy < y && jy >= y || jy < y && iy >= y) && (ix <= x || jx <= x) ? odd ^ (y - iy) / (jy - iy) * (jx - ix) + ix < x : odd;
		}, 0);
	}
}

export class Rectangle extends Polygon {
	constructor (start, end) {
		super(start, end);
	}

	copy () {
		return new Rectangle(...this.points);
	}

	area () {
		return Math.abs(this.points[0].x - this.points[1].x) * Math.abs(this.points[0].y - this.points[1].y);
	}

	perimeter () {
		return Math.abs(this.points[0].x - this.points[1].x) * 2 + Math.abs(this.points[0].y - this.points[1].y) * 2;
	}

	containsPoint ({ x, y }) {
		const { x: sx, y: sy } = this.points[0];
		const { x: ex, y: ey } = this.points[1];
		return (x >= sx && x <= ex || x <= sx && x >= ex) && (y >= sy && y <= ey || y <= sy && y >= ey);
	}
}
