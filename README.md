# js-utils
Javascript utility functions

- general/
	- array.js
		- compact
		- range
		- createDenseArray
		- includesAll
		- filterByOccurences
		- group
		- chunk
		- contentsAreEqual
		- filterIndices
		- findIndexOfSequence
		- findIndicesOfSequence
		- findEmptyIndices
		- isSparse
		- swap
		- shuffle
		- multiply
	- func.js
		- throttle
		- debounce
	- math.js
		- norm
		- lerp
		- clamp
		- round
		- wrap
		- isPrime
		- isApproxEqual
		- pi
		- getFactors
	- geom.js
		- Point
			- compare
		- Line
			- compare
			- getIntersections
			- containsPoint
	- matrix.js
		- createMatrix
		- wrapMatrix
		- isRegular
		- getDimensions
		- rotateMatrix
	- misc.js
		- isIterable
		- isNullish
		- isPrimitive
		- typeOf
		- attempt
		- sleep
	- object.js
		- isEmpty
		- filterByProps
		- deepClone
		- deepCompare
		- deepExtend
		- extract
		- deepRemove
		- findPaths
		- recurse
	- random.js
		- randFloat
		- randInt
		- randItem
		- randArray
		- randString
		- randHexColor
	- string.js
		- capitalize
		- decapitalize
		- toPascalCase
		- toCamelCase
		- toSnakeCase
		- toKebabCase
		- spliceString
		- truncateString
		- isEmail
	- time.js
		- WEEK_DAYS
		- MONTHS
		- MILLIS_BEFORE_1970
		- createTimeFormat
- browser/
	- client.js
		- MinimalWebSocketClient
			- connect
			- disconnect
			- send
			- getURL
	- misc.js
		- MinimalEventEmitter
			- emit
			- on
			- off
			- once
		- download
		- animate
		- getCookiesObject
