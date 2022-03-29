
/**
 * Capitalizes first letter
 * @param {string} string 
 * @returns {string}
 */
export function capitalize (string) {
	return string[0].toUpperCase() + string.slice(1);
}

/**
 * Decapitalizes first letter
 * @param {string} string 
 * @returns {string}
 */
export function decapitalize (string) {
	return string[0].toLowerCase() + string.slice(1);
}

/**
 * Formats string to PascalCase
 * @param {string} string 
 * @returns {string}
 */
export function toPascalCase (string) {
	return string.split(' ').map(capitalize).join('');
}

/**
 * Formats string to camelCase
 * @param {string} string 
 * @returns {string}
 */
export function toCamelCase (string) {
	return decapitalize(toPascalCase(string));
}

/**
 * Formats string to SNAKE_CASE
 * @param {string} string 
 * @returns {string}
 */
export function toSnakeCase (string) {
	return string.split(' ').map((word) => word.toUpperCase()).join('_');
}

/**
 * Formats string to kebab-case
 * @param {string} string 
 * @returns {string}
 */
export function toKebabCase (string) {
	return string.split(' ').map((word) => word.toLowerCase()).join('-');
}

/**
 * Array.prototype.splice but for strings
 * @param {string} string 
 * @param {number} index 
 * @param {number?} remove 
 * @param {string?} insert 
 * @returns {string}
 */
export function spliceString (string, index, remove = 0, insert = '') {
	return string.slice(0, index) + insert + string.slice(index + remove);
}

/**
 * Truncates the end of a string
 * @param {string} string 
 * @param {number} length 
 * @param {string?} replace 
 * @returns {string}
 */
export function truncateString (string, length, replace = '...') {
	return string.length > length
		? string.slice(0, length - replace.length) + replace
		: string;
}

/**
 * Reverses a string efficiently
 * @param {string} string 
 * @returns {string}
 */
export function reverseString (string) {
	let result = '';
	for (const char of string) result = char + result;
	return result;
}

/**
 * Checks whether string is a basic email
 * @param {string} string 
 * @returns {boolean}
 */
export function isEmail (string) {
	return /^(([a-z\d!#$%&'*+\/=?^_`{|}~-]+(\.[a-z\d!#$%&'*+\/=?^_`{|}~-]+)*)|(".+"))@([a-z\d-]+(\.[a-z\d]+)+|\[\d{1,3}(\.\d{1,3}){3}])$/i.test(string);
}

/**
 * Finds a basic number in string
 * @param {string} string 
 * @returns {number}
 */
export function findNumber (string) {
	return Number(string.match(/[-]?(\d+(\.\d+)?|\.\d+)(e[+-]?\d+)?/i)[0]);
}
