
/**
 * Capitalizes first letter
 * @param {string} string 
 * @returns {string}
 */
export const capitalize = (string) => string.replace(/[a-z]/i, (letter) => letter.toUpperCase());

/**
 * Decapitalizes first letter
 * @param {string} string 
 * @returns {string}
 */
export const decapitalize = (string) => string.replace(/[a-z]/i, (letter) => letter.toLowerCase());

/**
 * Array.prototype.splice but for strings
 * @param {string} string 
 * @param {number} index 
 * @param {number} remove optional parameter
 * @param {string} insert optional parameter
 * @returns {string}
 */
export const spliceString = (string, index, remove = 0, insert = '') => string.slice(0, index) + insert + string.slice(index + remove);

/**
 * Truncates string if it is longer than specified
 * @param {string} string 
 * @param {number} length 
 * @param {string} replace optional parameter
 * @returns {string}
 */
export const truncateString = (string, length, replace = '...') => string.length > length ? string.slice(0, length - replace.length) + replace : string;

/**
 * Formats string to Pascal case (PascalCase)
 * @param {string} string 
 * @returns {string}
 */
export const toPascalCase = (string) => string.split(' ').map(capitalize).join('');

/**
 * Formats string to Camel case (camelCase)
 * @param {string} string 
 * @returns {string}
 */
export const toCamelCase = (string) => decapitalize(toPascalCase(string));

/**
 * Formats string to Snake case (SNAKE_CASE)
 * @param {string} string 
 * @returns {string}
 */
export const toSnakeCase = (string) => string.split(' ').map((word) => word.toUpperCase()).join('_');

/**
 * Formats string to Kebab case (kebab-case)
 * @param {string} string 
 * @returns {string}
 */
export const toKebabCase = (string) => string.split(' ').map((word) => word.toLowerCase()).join('-');
