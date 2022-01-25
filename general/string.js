
export const capitalize = (string) => string.replace(/[a-z]/i, (letter) => letter.toUpperCase());

export const decapitalize = (string) => string.replace(/[a-z]/i, (letter) => letter.toLowerCase());

export const spliceString = (string, index = 0, remove = 0, insert) => string.split('').splice(index, remove, insert).join('');

export const toPascalCase = (string) => string.split(' ').map(capitalize).join('');

export const toCamelCase = (string) => decapitalize(toPascalCase(string));

export const toSnakeCase = (string) => string.split(' ').map((word) => word.toUpperCase()).join('_');

export const toKebabCase = (string) => string.split(' ').map((word) => word.toLowerCase()).join('-');
