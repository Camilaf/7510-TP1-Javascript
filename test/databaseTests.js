var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Database = require('../src/database');

describe("Database", function () {

    var database = null;
    
    beforeEach(function () {
        database = new Database();
        database.addFact({predicate: 'varon', parameters: ['juan']});
        database.addFact({predicate: 'varon', parameters: ['pepe']});
        database.addFact({predicate: 'mujer', parameters: ['maria']});
        database.addFact({predicate: 'padre', parameters: ['juan', 'pepe']});
        database.addRule({predicate: 'hijo', variables: ['X', 'Y'], objectives: [{predicate: 'varon', parameters: ['X']}, {predicate: 'padre', parameters: ['Y', 'X']}]});
        database.addRule({predicate: 'hijo_de_juan', variables: ['X'], objectives: [{predicate: 'varon', parameters: ['X']}, {predicate: 'padre', parameters: ['juan', 'X']}]});
    });
    
    describe('Fact in database', function () {
    
        it('hasFact({predicate: varon, parameters: [juan]}) should be true', function () {
            expect(database.hasFact({predicate: 'varon', parameters: ['juan']})).to.be.true;
        });
        
        it('hasFact({predicate: varon, parameters: [pepe]}) should be true', function () {
            expect(database.hasFact({predicate: 'varon', parameters: ['pepe']})).to.be.true;
        });
        
        it('hasFact({predicate: mujer, parameters: [maria]}) should be true', function () {
            expect(database.hasFact({predicate: 'mujer', parameters: ['maria']})).to.be.true;
        });
        
        it('hasFact({predicate: varon, parameters: [kevin]}) should be false', function () {
            expect(database.hasFact({predicate: 'varon', parameters: ['kevin']})).to.be.false;
        });
        
        it('hasFact({predicate: padre, parameters: [juan, pepe]}) should be true', function () {
            expect(database.hasFact({predicate: 'padre', parameters: ['juan', 'pepe']})).to.be.true;
        });
        
        it('hasFact({predicate: padre, parameters: [pepe, juan]}) should be false', function () {
            expect(database.hasFact({predicate: 'padre', parameters: ['pepe', 'juan']})).to.be.false;
        });
        
        it('hasFact({predicate: padre, parameters: [juan, matias]}) should be false', function () {
            expect(database.hasFact({predicate: 'padre', parameters: ['juan', 'matias']})).to.be.false;
        });
        
        it('hasFact({predicate: mujer, parameters: [ana]}) should be false', function () {
            expect(database.hasFact({predicate: 'mujer', parameters: ['ana']})).to.be.false;
        });
        
        it('hasFact({predicate: abuelo, parameters: [antonio, pepe]}) should be false', function () {
            expect(database.hasFact({predicate: 'abuelo', parameters: ['antonio', 'pepe']})).to.be.false;
        });

    });
    
    describe('Rule in database', function () {
    
        it('hasRule({predicate: varon, parameters: [juan]}) should be false', function () {
            expect(database.hasRule({predicate: 'varon', parameters: ['juan']})).to.be.false;
        });
        
        it('hasRule({predicate: hijo, parameters: [pepe, juan]}) should be true', function () {
            expect(database.hasRule({predicate: 'hijo', parameters: ['pepe', 'juan']})).to.be.true;
        });
        
        it('hasRule({predicate: hijo, parameters: [pepe, juan, roberto]}) should be false', function () {
            expect(database.hasRule({predicate: 'hijo', parameters: ['pepe', 'juan', 'roberto']})).to.be.false;
        });
        
        it('hasRule({predicate: hijo, parameters: [juan, pepe]}) should be false', function () {
            expect(database.hasRule({predicate: 'hijo', parameters: ['juan', 'pepe']})).to.be.false;
        });
        
        it('hasRule({predicate: hijo, parameters: [kevin, jorge]}) should be false', function () {
            expect(database.hasRule({predicate: 'hijo', parameters: ['kevin', 'jorge']})).to.be.false;
        });
        
        it('hasRule({predicate: hijo_de_juan, parameters: [pepe]}) should be true', function () {
            expect(database.hasRule({predicate: 'hijo_de_juan', parameters: ['pepe']})).to.be.true;
        });
        
        it('hasRule({predicate: hijo_de_juan, parameters: [marcelo]}) should be false', function () {
            expect(database.hasRule({predicate: 'hijo_de_juan', parameters: ['marcelo']})).to.be.false;
        });
        
        it('hasRule({predicate: hija, parameters: [ana, jorge]}) should be false', function () {
            expect(database.hasRule({predicate: 'hija', parameters: ['ana', 'jorge']})).to.be.false;
        });

    });
});
