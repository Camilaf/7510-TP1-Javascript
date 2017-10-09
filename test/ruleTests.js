var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Rule = require('../src/rule');

describe("Rule", function () {

    var rule = null;

    beforeEach(function () {
        rule = new Rule('hijo', ['X', 'Y'], [{predicate: 'varon', parameters: ['X']}, {predicate: 'padre', parameters: ['Y', 'X']}]);
        
    });
    
    describe('Same predicate', function () {

        it('samePredicate({predicate: varon, parameters: [juan]}) should be false', function () {
            expect(rule.samePredicate({predicate: 'varon', parameters: ['juan']})).to.be.false;
        });
        
        it('samePredicate({predicate: hijo, parameters: [juan, jorge]}) should be true', function () {
            expect(rule.samePredicate({predicate: 'hijo', parameters: ['juan', 'jorge']})).to.be.true;
        });

    });
    
    describe('Variable mapping', function () {

        it('mapVariables([juan, jorge]) should have mappings {X => juan, Y => jorge}', function () {
            var result = rule.mapVariables(['juan', 'jorge']);
            assert(result.get('X') === 'juan');
            assert(result.get('Y') === 'jorge');
        });

    });
   
});
