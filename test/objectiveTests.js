var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Objective = require('../src/objective');

describe("Objective", function () {

    
    describe('Build objective', function () {

        it('Build method should behave correctly', function () {
            var objective1 = new Objective('padre', ['Y', 'X']);
            var objective2 = new Objective('primo', ['Y', 'juan']);
            var variablesMap = new Map([['X', 'pepe'], ['Y', 'kevin']]);
            
            var result1 = objective1.build(variablesMap);
            expect(result1.predicate).to.equal('padre');
            expect(result1.parameters).to.deep.equal(['kevin', 'pepe']);
            
            var result2 = objective2.build(variablesMap);
            expect(result2.predicate).to.equal('primo');
            expect(result2.parameters).to.deep.equal(['kevin', 'juan']);
        });

    });
   
});
