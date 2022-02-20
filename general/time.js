
export const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const MILLIS_BEFORE_1970 = 6.212592e13;

export function destructDate (date = new Date()) {
	return {
		year: date.getFullYear(),
		month: date.getMonth(),
		date: date.getDate(),
		day: date.getDay(),
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds(),
		milliseconds: date.getMilliseconds(),
		yearUTC: date.getUTCFullYear(),
		monthUTC: date.getUTCMonth(),
		dateUTC: date.getUTCDate(),
		dayUTC: date.getUTCDay(),
		hoursUTC: date.getUTCHours(),
		minutesUTC: date.getUTCMinutes(),
		secondsUTC: date.getUTCSeconds(),
		millisecondsUTC: date.getUTCMilliseconds(),
		time: date.getTime()
	};
}

const timeFormatConfig = {
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

export function createTimeFormat (format, prefix = '%', options = {}) {
	const prefix = (check) => check ? 'UTC' : '';
	return (date = new Date(), utc = false, names = false) => prefix(utc) + format.replace(new RegExp(Object.keys(config).map((key) => prefix + key).join('|'), 'g'), (key) => {
		const type = key.replace(new RegExp(prefix), '');
		const { func, pad = 2, add = 0, arr, now = false } = { ...timeFormatConfig[type], ...options[type] };
		const num = date[`get${prefix(utc && !now)}${func}`]();
		return names && arr ? arr[num] : String(num + add).padStart(pad, 0);
	});
}
