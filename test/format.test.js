const rewire = require('rewire');
const assert = require('assert');

//Testing Variables 

const unformattedPlayerArray = require('./test-variables/scrapedStats.js');

const formatter = require("../format.js");

const populateDuplicatePlayerTeams = formatter.populateDuplicatePlayerTeams;
const format = formatter.format;
const removeDuplicateNames = formatter.removeDuplicateNames;

describe('populate team names for players that have TOT as team name', () => {
	it('should replace all instances of TOT with correct team name', () => {
		assert.strictEqual()
	})
})

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

//test specific functions

function hasTOT(arr) { 
	let TOT = false
	arr.forEach(item => item.Tm == "TOT" ? TOT = true : false)
	return TOT
 };
