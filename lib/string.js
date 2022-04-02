export function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}
export function decapitalize(string) {
    return string[0].toLowerCase() + string.slice(1);
}
export function toPascalCase(string) {
    return string.split(' ').map(capitalize).join('');
}
export function toCamelCase(string) {
    return decapitalize(toPascalCase(string));
}
export function toSnakeCase(string) {
    return string.split(' ').map((word) => word.toUpperCase()).join('_');
}
export function toKebabCase(string) {
    return string.split(' ').map((word) => word.toLowerCase()).join('-');
}
export function spliceString(string, index, remove = 0, insert = '') {
    return string.slice(0, index) + insert + string.slice(index + remove);
}
export function truncateString(string, length, replace = '...') {
    return string.length > length
        ? string.slice(0, length - replace.length) + replace
        : string;
}
export function reverseString(string) {
    let result = '';
    for (const char of string)
        result = char + result;
    return result;
}
export function isEmail(string) {
    return /^(([a-z\d!#$%&'*+\/=?^_`{|}~-]+(\.[a-z\d!#$%&'*+\/=?^_`{|}~-]+)*)|(".+"))@([a-z\d-]+(\.[a-z\d]+)+|\[\d{1,3}(\.\d{1,3}){3}])$/i.test(string);
}
export function findNumber(string) {
    return Number(string.match(/[-]?(\d+(\.\d+)?|\.\d+)(e[+-]?\d+)?/i)?.[0]);
}
