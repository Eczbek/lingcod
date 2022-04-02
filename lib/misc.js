export function isIterable(value) {
    return typeof value?.[Symbol.iterator] === 'function';
}
export function isNullish(value) {
    return value == null;
}
export function isPrimitive(value) {
    return Object(value) !== value;
}
export function typeOf(value) {
    return isNullish(value) ? String(value) : value?.constructor?.name ?? 'Object';
}
export function attempt(callback, otherwise) {
    try {
        return callback();
    }
    catch {
        return otherwise;
    }
}
export function sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis));
}
