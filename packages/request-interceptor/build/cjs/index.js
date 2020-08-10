'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = _interopDefault(require('lodash'));

function cube (x) {
  return x * x * x;
}

var a = () => { console.log(1); };
a();
_.chunk(['a', 'b', 'c', 'd'], 2);
console.log(cube(5));
//# sourceMappingURL=index.js.map
