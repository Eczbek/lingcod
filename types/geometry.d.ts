export declare function radiansToDegrees(radians: number): number;
export declare function degreesToRadians(degrees: number): number;
export declare class Point {
    static equal(...points: Point[]): boolean;
    constructor(x: number, y: number);
    x: number;
    y: number;
    copy(): Point;
}
export declare class Line {
    static intersections(...lines: Line[]): Point[];
    static parallel(...lines: Line[]): boolean;
    static equal(...lines: Line[]): boolean;
    constructor(start: Point, end: Point);
    start: Point;
    end: Point;
    copy(): Line;
    slope(): number;
    radians(): number;
    degrees(): number;
    containsPoint({ x, y }: Point): boolean;
}
export declare class Ray extends Line {
    static equal(...rays: Ray[]): boolean;
    constructor(start: Point, end: Point);
    copy(): Ray;
    containsPoint({ x, y }: Point): boolean;
}
export declare class Segment extends Line {
    static equal(...segments: Segment[]): boolean;
    constructor(start: Point, end: Point);
    copy(): Segment;
    length(): number;
    containsPoint({ x, y }: Point): boolean;
}
export declare class Polygon {
    static equal(...polygons: Polygon[]): boolean;
    constructor(...points: Point[]);
    points: Point[];
    copy(): Polygon;
    area(): number;
    perimeter(): number;
    containsPoint({ x, y }: Point): boolean;
}
export declare class Rectangle extends Polygon {
    constructor(start: Point, end: Point);
    width: number;
    height: number;
    area(): number;
    perimeter(): number;
    containsPoint({ x, y }: Point): boolean;
}
