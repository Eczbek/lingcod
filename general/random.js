
import { clamp } from './math.js';


export const randFloat = (max = 1, min = 0) => clamp(Math.random(), max, min);

export const randInt = (max = Number.MAX_SAFE_INTEGER, min) => Math.floor(randFloat(max, min));

export const randItem = (array) => array[randInt(array.length)];

export const randArray = (length, getValues) => {
	const arr = [];
	for (let i = 0; i < length; ++i) {
		arr.push(randItem(getValues(i)));
	}
	return arr;
}

export const randString = (length, getChars) => randArray(length, getChars).join('');

export const randHexColor = (max = '#ffffff', min = '#000000') => {
	max = max.replace('#', '');
	min = min.replace('#', '');
	return `#${randString(6, (index) => {
		const minNum = Number(`0x${min[index]}`);
		return randInt(Math.max(Number(`0x${max[index]}`), minNum), minNum).toString(16);
	})}`
}
