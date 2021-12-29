export const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const TIME_FROM_ORIGIN = 62168428800000; // Time before January 1, 1970



export function formatTime (format, words = false, date = new Date(), prefix = '\\$') {
	function getVal (val, pad = 2, add = 0, arr) {
		const num = date[`get${val}`]();
		return words && arr ? arr[num] : String(num + add).padStart(pad, 0);
	}
	const time = {
		year: getVal('FullYear'),
		mon: getVal('Month', 2, 1, MONTH_NAMES),
		date: getVal('Date'),
		day: getVal('Day', 1, 0, WEEK_DAYS),
		hour: getVal('Hours'),
		min: getVal('Minutes'),
		sec: getVal('Seconds'),
		ms: getVal('Milliseconds', 4),
		utcyear: getVal('UTCFullYear'),
		utcmon: getVal('UTCMonth', 2, 1, MONTH_NAMES),
		utcdate: getVal('UTCDate'),
		utcday: getVal('UTCDay', 1, 0, WEEK_DAYS),
		utchour: getVal('UTCHours'),
		utcmin: getVal('UTCMinutes'),
		utcsec: getVal('UTCSeconds'),
		utcms: getVal('UTCMilliseconds', 4),
		all: getVal('Time')
	}
	return format.replace(new RegExp(`${prefix}(${Object.keys(time).join('|')})`, 'gi'), (key) => time[key.replace(new RegExp(prefix), '').toLowerCase()]);
}
