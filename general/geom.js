
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

class Ray {

}

class Segment {

}

class Polygon {

}

class Ellipse {

}
