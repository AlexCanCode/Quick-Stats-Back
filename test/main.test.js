const rewire = require('rewire');
const assert = require('assert');

const app = rewire('../../Quick Stats/main/main.js')

checkBadValue = app.__get__('checkForBadValue');

console.log(checkForBadValue);