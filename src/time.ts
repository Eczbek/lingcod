
export const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const MILLIS_BEFORE_1970 = 6.212592e13;

interface Dictionary {
	[index: string]: any
}

export function destructDate (date = new Date(), addMonth = true) {
	return {
		year: date.getFullYear(),
		month: date.getMonth() + Number(addMonth),
		date: date.getDate(),
		day: date.getDay(),
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds(),
		milliseconds: date.getMilliseconds(),
		yearUTC: date.getUTCFullYear(),
		monthUTC: date.getUTCMonth() + Number(addMonth),
		dateUTC: date.getUTCDate(),
		dayUTC: date.getUTCDay(),
		hoursUTC: date.getUTCHours(),
		minutesUTC: date.getUTCMinutes(),
		secondsUTC: date.getUTCSeconds(),
		millisecondsUTC: date.getUTCMilliseconds(),
		time: date.getTime()
	} as Dictionary;
}

const formatConfig = {
	Y: { prop: 'year' },
	M: { prop: 'month', array: MONTHS },
	D: { prop: 'date' },
	d: { prop: 'day', padding: 1, array: WEEK_DAYS },
	H: { prop: 'hours' },
	m: { prop: 'minutes' },
	S: { prop: 'seconds' },
	s: { prop: 'milliseconds', padding: 3 },
	T: { prop: 'time', now: true }
} as Dictionary;

export function createTimeFormat (format: string, prefix = '%', addMonth = true) {
	return (date = new Date(), utc = false, names = false) => {
		const props = destructDate(date, addMonth);
		return format.replace(new RegExp(Object.keys(formatConfig).map((key) => prefix + key).join('|'), 'g'), (key) => {
			const type = key.replace(new RegExp(prefix), '');
			const { prop, padding = 2, array, now = false } = formatConfig[type];
			const num = props[prop + (utc && !now ? 'UTC' : '')];
			return names ? array[num] : String(num).padStart(padding, '0');
		});
	};
}
