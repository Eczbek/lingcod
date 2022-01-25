
import { clamp } from './math.js';


export const randomFloat = (max = 1, min = 0) => clamp(Math.random(), max, min);

export const randomInteger = (max = Number.MAX_SAFE_INTEGER, min) => Math.floor(randomFloat(max, min));

export const randomItem = (array) => array[randomInteger(array.length)];

export const randomArray = (length, getValues) => {
	const arr = [];
	for (let i = 0; i < length; ++i) {
		arr.push(randomItem(getValues(i)));
	}
	return arr;
}

export const randomString = (length, getChars) => randomArray(length, getChars).join('');

export const randomHexColor = (max = '#ffffff', min = '#000000') => {
	max = max.replace('#', '');
	min = min.replace('#', '');
	return `#${randomString(6, (index) => {
		const minNum = Number(`0x${min[index]}`);
		return randomInteger(Math.max(Number(`0x${max[index]}`), minNum), minNum).toString(16);
	})}`
}
