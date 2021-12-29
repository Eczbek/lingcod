export class Point {
	/**
	 * Creates point at coordinates
	 * @param {number} x 
	 * @param {number} y 
	 */
	constructor (x, y) {
		this.x = x;
		this.y = y;
	}


	/**
	 * Checks if points are equal
	 * @param  {...Point} points 
	 * @returns {boolean}
	 */
	static areEqual (...points) {
		return points.every(({ x, y }) => x === points[0].x && y === points[0].y);
	}
}


export class Line {
	/**
	 * Creates line between two points
	 * @param {Point} point1 
	 * @param {Point} point2 
	 */
	constructor (point1, point2) {
		this.start = point1;
		this.end = point2;
	}


	/**
	 * Calculates the length of line
	 * @param {Line} line 
	 * @returns {number}
	 */
	static getLength ({ start, end }) {
		return Math.hypot(start.x - end.x, start.y - end.y);
	}


	/**
	 * Checks if lines are intersecting
	 * @param  {...any} lines 
	 * @returns {boolean}
	 */
	static areIntersecting (...lines) {
		return lines.some((line1) => lines.some((line2) => {
			const det = (line1.end.x - line1.start.x) * (line1.end.y - line1.start.y) * (line2.end.x - line2.start.x) * (line2.end.y - line2.start.y);
			if (det === 0) return false;
			const lambda = ((line2.end.y - line2.start.y) * (line2.end.x - line1.start.x) + (line2.start.x - line2.end.x) * (line2.end.y - line1.start.y)) / det;
			const gamma = ((line1.start.y - line1.end.y) * (line2.end.x - line1.start.x) + (line1.end.x - line1.start.x) * (line2.end.y - line1.start.y)) / det;
			return lambda > 0 && lambda < 1 && gamma > 0 && gamma < 1;
		}));
	}
}


export class Polygon {
	/**
	 * Creates polygon between points
	 * @param  {...Point} points 
	 */
	constructor (...points) {
		this.points = points;
	}


	/**
	 * Calculates area of polygon
	 * @param {Polygon} polygon 
	 * @returns {number}
	 */
	static getArea ({ points }) {
		return Math.abs(points.reduce((area, point, idx) => area + point.x * points.at(idx - 1).y / 2 - points.at(idx - 1).x * point.y / 2, 0));
	}


	/**
	 * Checks if polygons are overlapping
	 * @param  {...any} polygons 
	 * @returns {boolean}
	 */
	static areOverlapping (...polygons) {
		return polygons.some((poly1, idx1) => polygons.some((poly2, idx2) => idx1 !== idx2 && poly1.points.some((point1, idx3) => poly2.points.some((point2, idx4) => Line.reIntersecting(new Line(point1, poly1.points.at(idx3 - 1)), new Line(point2, poly2.points.at(idx4 - 1)))))));
	}
}
