
export function binarySearch (sortedIterable, sortCallback) {
	let least = 0;
	let most = sortedIterable.length;
	while (true) {
		const mid = Math.floor((most - least) / 2) + least;
		const check = sortCallback(sortedIterable[mid]);
		if (!check) return mid;
		if (most - least < 2) return;
		if (check > 0) least = mid + 1;
		else most = mid;
	}
}
