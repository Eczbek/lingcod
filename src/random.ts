
import { randomInt } from 'crypto';

import { lerp } from './math.js';
import { fill } from './array.js';


const INT_LIMIT_48 = 2 ** 48 - 1;

export function randFloat (max = 1, min = 0, inclusive = false): number {
	return lerp(randomInt(INT_LIMIT_48) / INT_LIMIT_48, max + Number(inclusive), min);
}

export function randInt (max = Number.MAX_SAFE_INTEGER, min = 0, inclusive = false): number {
	return Math.floor(randFloat(max, min, inclusive));
}

export function randBool (): boolean {
	return !!randInt(2);
}

export function randItem (array: any[]): any {
	return array[randInt(array.length)];
}

export function randArray (length: number, values: any[]): any[] {
	return fill(length, () => randItem(values));
}

export function randString (length: number, chars: string): string {
	return randArray(length, chars.split('')).join('');
}

export function randHexColor (max = 'ffffff', min = '000000') {
	max = max.replace('#', '');
	min = min.replace('#', '');
	let hexColor = '#';
	for (let i = 0; i < 6; ++i) {
		const num = Number(`0x${min[i]}`);
		hexColor += randInt(Math.max(Number(`0x${max[i]}`), num), num).toString(16);
	}
	return hexColor;
}
