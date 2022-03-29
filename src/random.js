
import { lerp } from './math.js';


export function randFloat (max = 1, min = 0, inclusive = false) {
	return lerp(Math.random(), max + inclusive, min);
}

export function randInt (max = Number.MAX_SAFE_INTEGER, min, inclusive) {
	return Math.floor(randFloat(max, min, inclusive));
}

export function randBool () {
	return !!randInt(2);
}

export function randItem (array) {
	return array[randInt(array.length)];
}

export function randArray (length, getValues) {
	const arr = [];
	for (let i = 0; i < length; ++i) arr.push(randItem(typeOf(getValues) === 'Function' ? getValues(i) : getValues));
	return arr;
}

export function randString (length, getChars) {
	return randArray(length, getChars).join('');
}

export function randHexColor (max = '#ffffff', min = '#000000') {
	max = max.replace('#', '');
	min = min.replace('#', '');
	return `#${randString(6, (index) => {
		const minNum = Number(`0x${min[index]}`);
		return randInt(Math.max(Number(`0x${max[index]}`), minNum), minNum).toString(16);
	})}`;
}
