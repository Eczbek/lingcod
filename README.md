# lingcod
JavaScript utility library

## Installation

```bash
npm i lingcod
```

## Usage/Examples

```js
import { mergeSort } from 'lingcod/algorithm';

console.log(mergeSort([3,4,9,1,2,0,2])); // [0,1,2,2,3,4,9]
```

```js
import { Point, Segment } from 'lingcod/geometry';

const a = new Segment(new Point(0, 0), new Point(10, 10));
const b = new Segment(new Point(10, 0), new Point(0, 10));

console.log(Segment.intersections(a, b)); // [Point(5, 5)]
```

```js
import { wrap } from 'lingcod/math';

console.log(wrap(7, 5, -5)); // -2
```

```js
import { deepClone } from 'lingcod/object';

const original = { a: 1, b: { c: 2 } };
const copy = deepClone(original);

original.b.c = 3; // { a: 1, b: { c: 3 } }
console.log(copy); // { a: 1, b: { c: 2 } }
```

```js
import { randHexColor } from 'lingcod/random';

console.log(randHexColor('#ff11ff', '#0000ff')); // '#4a01ff'
```

```js
import { wrapMatrix } from 'lingcod/matrix';

console.log(wrapMatrix([1,2,3,4], [2,2])); // [[1,2],[3,4]]
```

```js
import { createTimeFormat } from 'lingcod/time';

const timeFormat = createTimeFormat('%Y-%M-%D %H:%m:%S');
const tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24);

console.log(tomorrow); // 'Mon Apr 04 2022 12:57:15 GMT-0400 (Eastern Daylight Time)'
console.log(timeFormat(tomorrow)); // 2022-04-04 12:57:15
```