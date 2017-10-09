var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Parser = require('../src/parser');

describe("Parser", function () {

    var parser = null;

    beforeEach(function () {
        parser = new Parser();
        
    });
    
    describe('Obtain clause predicate', function () {

        it('obtainClausePredicate(varon(juan).) should equal varon', function () {
            expect(parser.obtainClausePredicate('varon(juan).')).to.equal('varon');
        });
        
        it('obtainClausePredicate(padre_de(juan,pepe).) should equal padre_de', function () {
            expect(parser.obtainClausePredicate('padre_de(juan, pepe).')).to.equal('padre_de');
        });
        
        it('obtainClausePredicate(hijo(X,Y):-varon(X),padre(Y,X).) should equal hijo', function () {
            expect(parser.obtainClausePredicate('hijo(X,Y):-varon(X),padre(Y,X).')).to.equal('hijo');
        });
        
        it('obtainClausePredicate(subtract(X,Y,Z):-add(Y,Z,X).) should equal subtract', function () {
            expect(parser.obtainClausePredicate('subtract(X,Y,Z):-add(Y,Z,X).')).to.equal('subtract');
        });

    });
    
    describe('Obtain clause parameters', function () {

        it('obtainFactParameters(varon(juan).) should equal [juan]', function () {
            expect(parser.obtainFactParameters('varon(juan).')).to.deep.equal(['juan']);
        });
        
        it('obtainClauseParameters(padre(juan,pepe).) should equal [juan, pepe]', function () {
            expect(parser.obtainFactParameters('padre(juan,pepe).')).to.deep.equal(['juan', 'pepe']);
        });
        
        it('obtainQueryParameters(mujer(juana)) should equal [juana]', function () {
            expect(parser.obtainQueryParameters('mujer(juana)')).to.deep.equal(['juana']);
        });
        
        it('obtainQueryParameters(trillizos(juan,bren,agus)) should equal [juan, bren, agus]', function () {
            expect(parser.obtainQueryParameters('trillizos(juan,bren,agus)')).to.deep.equal(['juan', 'bren', 'agus']);
        });
        
        it('obtainRuleVariables(hijo(X,Y):-varon(X),padre(Y,X).) should equal [X,Y]', function () {
            expect(parser.obtainRuleVariables('hijo(X,Y):-varon(X),padre(Y,X).')).to.deep.equal(['X', 'Y']);
        });
        
        it('obtainRuleVariables(subtract(X,Y,Z):-add(Y,Z,X).) should equal [X,Y,Z]', function () {
            expect(parser.obtainRuleVariables('subtract(X,Y,Z):-add(Y,Z,X).')).to.deep.equal(['X', 'Y', 'Z']);
        });

    });
    
    describe('Obtain rule objectives', function () {
    
        it('obtainRuleObjectives(hijo(X,Y):-varon(X),padre(Y,X).) should equal [varon(X), padre(Y,X)]', function () {
            expect(parser.obtainRuleObjectives('hijo(X,Y):-varon(X),padre(Y,X).')).to.deep.equal(['varon(X)', 'padre(Y,X)']);
        });
        
        it('obtainRuleVariables(subtract(X,Y,Z):-add(Y,Z,X).) should equal [add(Y,Z,X)]', function () {
            expect(parser.obtainRuleObjectives('subtract(X,Y,Z):-add(Y,Z,X).')).to.deep.equal(['add(Y,Z,X)']);
        });
        
        it('obtainRuleVariables(amigos(X,Y,Z):-amigo(X,Y),amigo(X,Z),amigo(Y,X),amigo(Y,Z),amigo(Z,X),amigo(Z,Y).) should equal [amigo(X,Y), amigo(X,Z), amigo(Y,X), amigo(Y,Z), amigo(Z,X), amigo(Z,Y)]', function () {
            expect(parser.obtainRuleObjectives('amigos(X,Y,Z):-amigo(X,Y),amigo(X,Z),amigo(Y,X),amigo(Y,Z),amigo(Z,X),amigo(Z,Y).')).to.deep.equal(['amigo(X,Y)', 'amigo(X,Z)', 'amigo(Y,X)', 'amigo(Y,Z)', 'amigo(Z,X)', 'amigo(Z,Y)']);
        });

    });
    
    
    describe('Parse Fact', function () {

        it('parseFact(varon(juan).)', function () {
            var result = parser.parseFact('varon(juan).');
            expect(result).to.have.property('predicate');
            expect(result).to.have.property('parameters');
            expect(result.predicate).to.equal('varon');
            expect(result.parameters).to.deep.equal(['juan']);
        });
        
        it('parseFact(padre_de(juan,pepe).)', function () {
            var result = parser.parseFact('padre_de(juan,pepe).');
            expect(result.predicate).to.equal('padre_de');
            expect(result.parameters).to.deep.equal(['juan', 'pepe']);
        });
        
        it('parseFact(cuatrillizos(bren,agus,cande,marti).)', function () {
            var result = parser.parseFact('cuatrillizos(bren,agus,cande,marti).');
            expect(result.predicate).to.equal('cuatrillizos');
            expect(result.parameters).to.deep.equal(['bren', 'agus', 'cande', 'marti']);
        });

    });
    
    describe('Parse Query', function () {
 
        it('parseQuery(varon(juan))', function () {
            var result = parser.parseQuery('varon(lean)');
            expect(result).to.have.property('predicate');
            expect(result).to.have.property('parameters');
            expect(result.predicate).to.equal('varon');
            expect(result.parameters).to.deep.equal(['lean']);
        });
        
        it('parseQuery(primo(juan,emi))', function () {
            var result = parser.parseQuery('primo(juan,emi)');
            expect(result.predicate).to.equal('primo');
            expect(result.parameters).to.deep.equal(['juan', 'emi']);
        });
        
        it('parseQuery(amigos(lean,emi,hect))', function () {
            var result = parser.parseQuery('amigos(lean,emi,hect)');
            expect(result.predicate).to.equal('amigos');
            expect(result.parameters).to.deep.equal(['lean', 'emi', 'hect']);
        });
        
    });
    
    describe('Parse Rule Objectives', function () {

        it('parseRuleObjectives(hijo(X,Y):-varon(X),padre(Y,X).)', function () {
            expect(parser.parseRuleObjectives('hijo(X,Y):-varon(X),padre(Y,X).')).to.deep.equal([{predicate: 'varon', parameters: ['X']}, {predicate: 'padre', parameters: ['Y', 'X']}]);
        });
        
        it('parseRuleObjectives(subtract(X,Y,Z):-add(Y,Z,X).)', function () {
            expect(parser.parseRuleObjectives('subtract(X,Y,Z):-add(Y,Z,X).')).to.deep.equal([{predicate: 'add', parameters: ['Y', 'Z', 'X']}]);
        });
        
        it('parseRuleObjectives(amigos(X,Y,Z):-amigo(X,Y),amigo(X,Z),amigo(Y,X),amigo(Y,Z),amigo(Z,X),amigo(Z,Y).)', function () {
            expect(parser.parseRuleObjectives('amigos(X,Y,Z):-amigo(X,Y),amigo(X,Z),amigo(Y,X),amigo(Y,Z),amigo(Z,X),amigo(Z,Y).')).to.deep.equal([{predicate: 'amigo', parameters: ['X', 'Y']}, {predicate: 'amigo', parameters: ['X', 'Z']}, {predicate: 'amigo', parameters: ['Y', 'X']}, {predicate: 'amigo', parameters: ['Y', 'Z']}, {predicate: 'amigo', parameters: ['Z', 'X']}, {predicate: 'amigo', parameters: ['Z', 'Y']}]);
        });

    });
    
    describe('Parse Rule', function () {

        it('parseRule(hijo(X,Y):-varon(X),padre(Y,X).)', function () {
            var result = parser.parseRule('hijo(X,Y):-varon(X),padre(Y,X).');
            expect(result).to.have.property('predicate');
            expect(result).to.have.property('variables');
            expect(result).to.have.property('objectives');
            expect(result.predicate).to.equal('hijo');
            expect(result.variables).to.deep.equal(['X', 'Y']);
            expect(result.objectives).to.deep.equal([{predicate: 'varon', parameters: ['X']}, {predicate: 'padre', parameters: ['Y', 'X']}]);
        });
        
        it('parseRule(subtract(X,Y,Z):-add(Y,Z,X).)', function () {
            var result = parser.parseRule('subtract(X,Y,Z):-add(Y,Z,X).');
            expect(result.predicate).to.equal('subtract');
            expect(result.variables).to.deep.equal(['X', 'Y', 'Z']);
            expect(result.objectives).to.deep.equal([{predicate: 'add', parameters: ['Y', 'Z', 'X']}]);
        });
        
        it('parseRule(amigos(X,Y,Z):-amigo(X,Y),amigo(X,Z),amigo(Y,X),amigo(Y,Z),amigo(Z,X),amigo(Z,Y).)', function () {
            var result = parser.parseRule('amigos(X,Y,Z):-amigo(X,Y),amigo(X,Z),amigo(Y,X),amigo(Y,Z),amigo(Z,X),amigo(Z,Y).');
            expect(result.predicate).to.equal('amigos');
            expect(result.variables).to.deep.equal(['X', 'Y', 'Z']);
            expect(result.objectives).to.deep.equal([{predicate: 'amigo', parameters: ['X', 'Y']}, {predicate: 'amigo', parameters: ['X', 'Z']}, {predicate: 'amigo', parameters: ['Y', 'X']}, {predicate: 'amigo', parameters: ['Y', 'Z']}, {predicate: 'amigo', parameters: ['Z', 'X']}, {predicate: 'amigo', parameters: ['Z', 'Y']}]);
        });
    });

});


