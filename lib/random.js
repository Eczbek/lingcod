import { randomInt } from 'crypto';
import { lerp } from './math';
import { fill } from './array';
export function randFloat(max = 1, min = 0, inclusive = false) {
    return lerp(randomInt(281474976710655), max + Number(inclusive), min);
}
export function randInt(max = Number.MAX_SAFE_INTEGER, min = 0, inclusive = false) {
    return Math.floor(randFloat(max, min, inclusive));
}
export function randBool() {
    return !!randInt(2);
}
export function randItem(array) {
    return array[randInt(array.length)];
}
export function randArray(length, values) {
    return fill(length, () => randItem(values));
}
export function randString(length, chars) {
    return randArray(length, chars.split('')).join('');
}
export function randHexColor(max = 'ffffff', min = '000000') {
    max = max.replace('#', '');
    min = min.replace('#', '');
    let hexColor = '#';
    for (let i = 0; i < 6; ++i) {
        const num = Number(`0x${min[i]}`);
        hexColor += randInt(Math.max(Number(`0x${max[i]}`), num), num).toString(16);
    }
    return hexColor;
}
