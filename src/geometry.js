
import { approxEqual } from './math.js';


export function radiansToDegrees (radians) {
	return radians * 180 / Math.PI;
}

export function degreesToRadians (degrees) {
	return degrees * Math.PI / 180;
}

export class Point {
	static areEqual (...points) {
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
	static areParallel (...lines) {
		const [first, ...rest] = lines;
		const firstSlope = first.slope.x / first.slope.y;
		return rest.every(({ slope }) => approxEqual(firstSlope, slope.x / slope.y));
	}

	static areEqual (...lines) {
		const [first, ...rest] = lines;
		return Line.areParallel(...lines) && rest.every(({ origin }) => first.containsPoint(origin));
	}

	static getIntersections (...lines) {
		const points = [];
		lines.forEach(({ origin, slope }, index1) => {
			const x1 = origin.x;
			const y1 = origin.y;
			const x2 = x1 + slope.x;
			const y2 = y1 + slope.y;
			lines.forEach(({ origin, slope }, index2) => {
				if (index1 === index2) return;
				const x3 = origin.x;
				const y3 = origin.y;
				const x4 = x3 + slope.x;
				const y4 = y3 + slope.y;
				const a = x3 - x4;
				const b = x1 - x2;
				const c = y3 - y4;
				const d = y1 - y2;
				const e = b * c - d * a;
				if (!e) return;
				const f = x1 * y2 - y1 * x2;
				const g = x3 * y4 - y3 * x4;
				points.push(new Point((f * a - b * g) / e, (f * c - d * g) / e));
			});
		});
		return points;
	}

	constructor (slope, origin = new Point(0, 0)) {
		this.slope = slope.copy();
		this.origin = origin.copy();
	}

	copy () {
		return new Line(this.slope, this.origin);
	}

	containsPoint ({ x, y }) {
		return approxEqual(y, x * this.slope.x / this.slope.y + this.origin.y);
	}

	getRadians () {
		return Math.atan2(this.slope.y, this.slope.x);
	}

	getDegrees () {
		return radiansToDegrees(this.getRadians());
	}
}

class Ray {

}

class Segment {

}

class Polygon {

}

class Ellipse {

}
