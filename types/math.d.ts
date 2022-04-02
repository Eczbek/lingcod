export declare function norm(number: number, max: number, min?: number): number;
export declare function lerp(number: number, max: number, min?: number): number;
export declare function clamp(number: number, max: number, min?: number): number;
export declare function round(number: number, step?: number): number;
export declare function wrap(number: number, max: number, min?: number): number;
export declare function approxEqual(number1: number, number2: number, absEpsilon?: number, relEpsilon?: number): boolean;
export declare function PI(digits?: number): Generator<number, void, unknown>;
export declare function getFactors(number: number): number[];
