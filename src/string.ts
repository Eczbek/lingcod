
export function capitalize (string: string): string {
	return string[0].toUpperCase() + string.slice(1);
}

export function decapitalize (string: string): string {
	return string[0].toLowerCase() + string.slice(1);
}

export function toPascalCase (string: string): string {
	return string.split(' ').map(capitalize).join('');
}

export function toCamelCase (string: string): string {
	return decapitalize(toPascalCase(string));
}

export function toSnakeCase (string: string): string {
	return string.split(' ').map((word) => word.toUpperCase()).join('_');
}

export function toKebabCase (string: string): string {
	return string.split(' ').map((word) => word.toLowerCase()).join('-');
}

export function spliceString (string: string, index: number, remove = 0, insert = ''): string {
	return string.slice(0, index) + insert + string.slice(index + remove);
}

export function truncateString (string: string, length: number, replace = '...'): string {
	return string.length > length
		? string.slice(0, length - replace.length) + replace
		: string;
}

export function reverseString (string: string): string {
	let result = '';
	for (const char of string) result = char + result;
	return result;
}

export function isEmail (string: string): boolean {
	return /^(([a-z\d!#$%&'*+\/=?^_`{|}~-]+(\.[a-z\d!#$%&'*+\/=?^_`{|}~-]+)*)|(".+"))@([a-z\d-]+(\.[a-z\d]+)+|\[\d{1,3}(\.\d{1,3}){3}])$/i.test(string);
}

export function findNumber (string: string): number {
	return Number(string.match(/[-]?(\d+(\.\d+)?|\.\d+)(e[+-]?\d+)?/i)?.[0]);
}
