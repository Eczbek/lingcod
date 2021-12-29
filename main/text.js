/**
 * Capitalizes the first letter
 * @param {string} text 
 * @returns {string}
 */
export function capitalize (text) {
	return text.replace(/[a-z]/i, (letter) => letter.toUpperCase());
}


/**
 * Decapitalizes the first letter
 * @param {string} text 
 * @returns {string}
 */
export function decapitalize (text) {
	return text.replace(/[a-z]/i, (letter) => letter.toLowerCase());
}


/**
 * Formats text to PascalCase
 * @param {string} text 
 * @returns {string}
 */
export function toPascalCase (text) {
	return text.toLowerCase().split(' ').map(this.capitalize).join('');
}


/**
 * Formats text to camelCase
 * @param {string} text 
 * @returns {string}
 */
export function toCamelCase (text) {
	return this.decapitalize(this.toPascalCase(text));
}


/**
 * Formats text to SNAKE_CASE
 * @param {string} text 
 * @returns {string}
 */
export function toSnakeCase (text) {
	return text.split(' ').map((word) => word.toUpperCase()).join('_');
}


/**
 * Formats text to kebab-case
 * @param {string} text 
 * @returns {string}
 */
export function toKebabCase (text) {
	return text.split(' ').map((word) => word.toLowerCase()).join('-');
}
