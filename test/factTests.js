var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Fact = require('../src/fact');

describe("Fact", function () {

    var fact = null;

    beforeEach(function () {
        fact = new Fact('padre', ['juan', 'pepe']);
        
    });
    
    describe('Same predicate', function () {

        it('samePredicate({predicate: varon, parameters: [juan]}) should be false', function () {
            expect(fact.samePredicate({predicate: 'varon', parameters: ['juan']})).to.be.false;
        });
        
        it('samePredicate({predicate: padre, parameters: [juan, jorge]}) should be true', function () {
            expect(fact.samePredicate({predicate: 'padre', parameters: ['juan', 'jorge']})).to.be.true;
        });

    });
    
    describe('Same parameters', function () {

        it('sameParameters({predicate: varon, parameters: [juan]}) should be false', function () {
            expect(fact.sameParameters({predicate: 'varon', parameters: ['juan']})).to.be.false;
        });
        
        it('sameParameters({predicate: padre, parameters: [juan, jorge]}) should be false', function () {
            expect(fact.sameParameters({predicate: 'padre', parameters: ['juan', 'jorge']})).to.be.false;
        });
        
        it('sameParameters({predicate: padre, parameters: [juan, pepe]}) should be true', function () {
            expect(fact.sameParameters({predicate: 'padre', parameters: ['juan', 'pepe']})).to.be.true;
        });

    });
    
    describe('Fact equal to another', function () {

        it('equalTo({predicate: varon, parameters: [juan]}) should be false', function () {
            expect(fact.equalTo({predicate: 'varon', parameters: ['juan']})).to.be.false;
        });
        
        it('equalTo({predicate: padre, parameters: [juan, jorge]}) should be false', function () {
            expect(fact.equalTo({predicate: 'padre', parameters: ['juan', 'jorge']})).to.be.false;
        });
        
        it('equalTo({predicate: padre, parameters: [juan, pepe]}) should be true', function () {
            expect(fact.equalTo({predicate: 'padre', parameters: ['juan', 'pepe']})).to.be.true;
        });

    });
   
});
