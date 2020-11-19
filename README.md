Converter Utility
=================

Convert to X from Y.

### Browser

~~~ html
<script src="./@taufik-nurrohman/to/index.js"></script>
<script>
console.log(toNumber('1'));
</script>
~~~

### Browser Module

~~~ html
<script type="module">
import {toNumber} from './@taufik-nurrohman/to/index.mjs';

console.log(toNumber('1'));
</script>
~~~

### CommonJS Module

~~~ js
const {toNumber} = require('@taufik-nurrohman/to');

console.log(toNumber('1'));
~~~

### ECMAScript Module

~~~ js
import {toNumber} from '@taufik-nurrohman/to';

console.log(toNumber('1'));
~~~

Methods
-------

### toBoolean(any)

### toHTML(string)

### toJSON(any)

### toNumber(string, base = 10)

### toString(any)

### toURL(string)

### toValue(any)
