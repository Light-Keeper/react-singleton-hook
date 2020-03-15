const assert = require('assert');

const { singletonHook } = require('../build/compiled');
assert(typeof singletonHook === 'function');
