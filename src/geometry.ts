
import { approxEqual } from './math.js';
import { findIndexOfSubarray } from './array.js';


export function radiansToDegrees (radians: number) {
	return radians * 180 / Math.PI;
}

export function degreesToRadians (degrees: number) {
	return degrees * Math.PI / 180;
}

export class Point {
	static equal (...points: Point[]) {
		const [first, ...rest] = points;
		return rest.every(({ x, y }) => first.x === x && first.y === y);
	}

	constructor (x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	x: number;
	y: number;

	copy () {
		return new Point(this.x, this.y);
	}
}

export class Line {
	static intersections (...lines: Line[]) {
		const points: Point[] = [];
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

	static parallel (...lines: Line[]) {
		const [first, ...rest] = lines;
		const firstSlope = first.slope();
		return rest.every((line) => approxEqual(firstSlope, line.slope()));
	}

	static equal (...lines: Line[]) {
		const [first, ...rest] = lines;
		return Line.parallel(...lines) && rest.every(({ start }) => first.containsPoint(start));
	}

	constructor (start: Point, end: Point) {
		this.start = start.copy();
		this.end = end.copy();
	}

	start: Point;
	end: Point;

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

	containsPoint({ x, y }: Point) {
		return approxEqual(y, x * this.slope() - this.start.x * this.slope() + this.start.y);
	}
}

export class Ray extends Line {
	static equal (...rays: Ray[]) {
		const [first, ...rest] = rays;
		return rest.every(({ start, end }) => Point.equal(first.start, start) && first.containsPoint(end));
	}

	constructor (start: Point, end: Point) {
		super(start, end);
	}

	copy () {
		return new Ray(this.start, this.end);
	}

	containsPoint ({ x, y }: Point) {
		return approxEqual(y, x * this.slope() - this.start.x * this.slope() + this.start.y) && (this.end.x > this.start.x ? x >= this.start.x : x <= this.start.x) && (this.end.y > this.start.y ? y >= this.start.y : y <= this.start.y);
	}
}

export class Segment extends Line {
	static equal (...segments: Segment[]) {
		const [first, ...rest] = segments;
		return rest.every(({ start, end }) => Point.equal(first.start, start) && Point.equal(first.end, end) || Point.equal(first.start, end) && Point.equal(first.end, start));
	}

	constructor (start: Point, end: Point) {
		super(start, end);
	}

	copy () {
		return new Segment(this.start, this.end);
	}

	length () {
		return Math.hypot(this.start.x - this.end.x, this.start.y - this.end.y);
	}

	containsPoint ({ x, y }: Point) {
		return approxEqual(y, x * this.slope() - this.start.x * this.slope() + this.start.y) && (x >= this.start.x && x <= this.end.x || x >= this.end.x && x <= this.start.x) && (y >= this.start.y && y <= this.end.y || y >= this.end.y && y <= this.start.y);
	}
}

export class Polygon {
	static equal (...polygons: Polygon[]) {
		const [first, ...rest] = polygons;
		const check = (points: Point[]) => findIndexOfSubarray(first.points, points, true, Point.equal) >= 0;
		return rest.every(({ points }) => check(points) || check([...points].reverse()));
	}

	constructor (...points: Point[]) {
		this.points = points.map((point) => point.copy());
	}

	points: Point[];

	copy () {
		return new Polygon(...this.points);
	}

	area () {
		return Math.abs(this.points.reduce((area, { x, y }, index) => area + x * Number(this.points.at(index - 1)?.y) / 2 - y * Number(this.points.at(index - 1)?.x) / 2, 0));
	}

	perimeter () {
		return this.points.reduce((length, point, index) => length + new Segment(point, this.points.at(index - 1) ?? point).length(), 0);
	}

	containsPoint ({ x, y }: Point) {
		return !!this.points.reduce((odd, { x: ix, y: iy }, index) => {
			const { x: jx, y: jy } = this.points.at(index - 1) ?? this.points[index];
			return (iy < y && y < jy || jy < y && y < iy) && (x > ix || x > jx) ? odd ^ Number((y - iy) / (jy - iy) * (jx - ix) + ix < x) : odd;
		}, 0) || this.points.some((point, index) => new Segment(point, this.points.at(index - 1) ?? point).containsPoint(new Point(x, y)));
	}
}

export class Rectangle extends Polygon {
	constructor (start: Point, end: Point) {
		super(start, end);
	}

	width = Math.abs(this.points[0].x - this.points[1].x);
	height = Math.abs(this.points[0].y - this.points[1].y);

	area () {
		return this.width * this.height;
	}

	perimeter () {
		return this.width * 2 + this.height * 2;
	}

	containsPoint ({ x, y }: Point) {
		const { x: sx, y: sy } = this.points[0];
		const { x: ex, y: ey } = this.points[1];
		return (x >= sx && x <= ex || x <= sx && x >= ex) && (y >= sy && y <= ey || y <= sy && y >= ey);
	}
}
