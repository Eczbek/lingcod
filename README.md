# lingcod
JavaScript utility library

## Installation

```bash
npm i lingcod
```

## Usage/Examples

```javascript
import { mergeSort } from 'lingcod/algorithm';

mergeSort([3,4,9,1,2,0,2]) // [0,1,2,2,3,4,9]
```

```javascript
import { Point, Segment } from 'lingcod/geometry';

const a = new Segment(new Point(0, 0), new Point(10, 10));
const b = new Segment(new Point(10, 0), new Point(0, 10));

Segment.intersections(a, b) // [new Point(5, 5)]
```
