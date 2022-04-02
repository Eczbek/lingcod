export function throttle(callback, millis) {
    let last = 0;
    return (...args) => {
        if (Date.now() - last < millis)
            return;
        last = Date.now();
        callback(...args);
    };
}
export function debounce(callback, millis) {
    let timer;
    const debounced = (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), millis);
    };
    debounced.cancel = () => clearTimeout(timer);
    return debounced;
}
export function chain(...callbacks) {
    return async (...args) => callbacks.slice(1).reduce(async (value, callback) => await callback(value), await callbacks[0](...args));
}
