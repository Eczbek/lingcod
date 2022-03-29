
export const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const MILLIS_BEFORE_1970 = 6.212592e13;


const formatConfig = {
	Y: { func: 'FullYear', pad: 4 },
	M: { func: 'Month', add: 1, arr: MONTHS },
	D: { func: 'Date' },
	d: { func: 'Day', pad: 1, arr: WEEK_DAYS },
	H: { func: 'Hours' },
	m: { func: 'Minutes' },
	S: { func: 'Seconds' },
	s: { func: 'Milliseconds', pad: 3 },
	T: { func: 'Time', pad: 0, now: true }
};

/**
 * Creates a time formatter
 * @param {string} format 
 * @param {string} prefix 
 * @param {Object} options 
 * @returns {(date: Date, utc: boolean, names: boolean) => string}
 */
export function createTimeFormat (format, prefix = '%') {
	const getPrefix = (check) => check ? 'UTC' : '';
	return (date = new Date(), utc = false, names = false) => getPrefix(utc) + format.replace(new RegExp(Object.keys(formatConfig).map((key) => prefix + key).join('|'), 'g'), (key) => {
		const type = key.replace(new RegExp(prefix), '');
		const { func, pad = 2, add = 0, arr, now = false } = formatConfig[type];
		const num = date[`get${getPrefix(utc && !now)}${func}`]();
		return names && arr ? arr[num] : String(num + add).padStart(pad, 0);
	});
}
