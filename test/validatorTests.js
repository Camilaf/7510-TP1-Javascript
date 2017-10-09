var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Validator = require('../src/validator');

describe("Validator", function () {

    var validator = null;

    beforeEach(function () {
        validator = new Validator();
        
    });
    
    describe('Rule or fact? with valid clauses', function () {

        it('isValidFact(varon(juan).) should be true', function () {
            expect(validator.isValidFact('varon(juan).')).to.be.true;
        });
        
        it('isValidRule(varon(juan).) should be false', function () {
            expect(validator.isValidRule('varon(juan).')).to.be.false;
        });

        it('isValidRule(primo(jorge,maria).) should be false', function () {
            expect(validator.isValidRule('primo(jorge,maria).')).to.be.false;
        });
        
        it('isValidFact(primo(jorge,maria).) should be true', function () {
            expect(validator.isValidFact('primo(jorge,maria).')).to.be.true;
        });

        it('isValidRule(hijo(X,Y):-varon(X),padre(Y,X).) should be true', function () {
            expect(validator.isValidRule('hijo(X,Y):-varon(X),padre(Y,X).')).to.be.true;
        });
        
        it('isValidFact(hijo(X,Y):-varon(X),padre(Y,X).) should be false', function () {
            expect(validator.isValidFact('hijo(X,Y):-varon(X),padre(Y,X).')).to.be.false;
        });

        it('isValidRule(subtract(X,Y,Z):-add(Y,Z,X).) should be true', function () {
            expect(validator.isValidRule('subtract(X,Y,Z):-add(Y,Z,X).')).to.be.true;
        });
        
        it('isValidFact(subtract(X,Y,Z):-add(Y,Z,X).) should be false', function () {
            expect(validator.isValidFact('subtract(X,Y,Z):-add(Y,Z,X).')).to.be.false;
        });

    });
    
    describe('Fact validation', function () {

        it('varon(juan). should be true', function () {
            expect(validator.isValidFact('varon(juan).')).to.be.true;
        });

        it('varon(juan) should be false', function () {
            expect(validator.isValidFact('varon(juan)')).to.be.false;
        });
        
        it('varon(). should be false', function () {
            expect(validator.isValidFact('varon().')).to.be.false;
        });
        
        it('(juan). should be false', function () {
            expect(validator.isValidFact('(juan).')).to.be.false;
        });
        
        it('hijo_de(pepe,juan). should be true', function () {
            expect(validator.isValidFact('hijo_de(pepe,juan).')).to.be.true;
        });
        
        it('varon(juan,). should be false', function () {
            expect(validator.isValidFact('varon(juan,).')).to.be.false;
        });
        
        it('varon(,juan). should be false', function () {
            expect(validator.isValidFact('varon(,juan).')).to.be.false;
        });
        
        it('trillizas(maria,marta,ana). should be true', function () {
            expect(validator.isValidFact('trillizas(maria,marta,ana).')).to.be.true;
        });
        
        it('Trillizas(maria,marta,ana). should be false', function () {
            expect(validator.isValidFact('Trillizas(maria,marta,ana).')).to.be.false;
        });
        
        it('trillizas. should be false', function () {
            expect(validator.isValidFact('trillizas.')).to.be.false;
        });
        
        it('suma(1,2). should be true', function () {
            expect(validator.isValidFact('suma(1,2).')).to.be.true;
        });
        
        it('suma3(1,2). should be false', function () {
            expect(validator.isValidFact('suma3(1,2).')).to.be.false;
        });
        
        it('varon(X). should be false', function () {
            expect(validator.isValidFact('varon(X).')).to.be.false;
        });
        
        it('primo(X,pepe). should be false', function () {
            expect(validator.isValidFact('varon(X,pepe).')).to.be.false;
        });

    });
    
    describe('Rule validation', function () {
    
        it('isValidRule(hijo(X,Y):-varon(X),padre(Y,X).) should be true', function () {
            expect(validator.isValidRule('hijo(X,Y):-varon(X),padre(Y,X).')).to.be.true;
        });
        
        it('isValidRule(hijo(X,Y):-varon(X),padre(Y,X)) should be false', function () {
            expect(validator.isValidRule('hijo(X,Y):-varon(X),padre(Y,X)')).to.be.false;
        });
        
        it('isValidRule(hijo(,Y):-varon(X),padre(Y,X).) should be false', function () {
            expect(validator.isValidRule('hijo(,Y):-varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isValidRule(hijo(X,):-varon(X),padre(Y,X).) should be false', function () {
            expect(validator.isValidRule('hijo(X,):-varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isValidRule(hijo:-varon(X),padre(Y,X).) should be false', function () {
            expect(validator.isValidRule('hijo:-varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isValidRule((X,Y):-varon(X),padre(Y,X).) should be false', function () {
            expect(validator.isValidRule('(X,Y):-varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isValidRule(_(X,Y):-varon(X),padre(Y,X).) should be false', function () {
            expect(validator.isValidRule('_(X,Y):-varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isValidRule(hijo(X,Y):varon(X),padre(Y,X).) should be false', function () {
            expect(validator.isValidRule('hijo(X,Y):varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isValidRule(Hijo(X,Y):-varon(X),padre(Y,X).) should be false', function () {
            expect(validator.isValidRule('Hijo(X,Y):-varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isValidRule(hijo_de(X,Y):-varon(X),padre(Y,X).) should be true', function () {
            expect(validator.isValidRule('hijo_de(X,Y):-varon(X),padre(Y,X).')).to.be.true;
        });
        
        it('isValidRule(hijo():-varon(X),padre(Y,X).) should be false', function () {
            expect(validator.isValidRule('hijo():-varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isValidRule(hijo(X,Y):-,padre(Y,X).) should be false', function () {
            expect(validator.isValidRule('hijo(X,Y):-,padre(Y,X).')).to.be.false;
        });
        
        it('isValidRule(hijo(X,Y):-varon(X),.) should be false', function () {
            expect(validator.isValidRule('hijo(X,Y):-varon(X),.')).to.be.false;
        });
        
        it('isValidRule(hijo(X,Y):-varon(),padre(Y,X).) should be false', function () {
            expect(validator.isValidRule('hijo(X,Y):-varon(),padre(Y,X).')).to.be.false;
        });
        
        it('isValidRule(hijo(X,Y):-varon(X),padre) should be false', function () {
            expect(validator.isValidRule('hijo(X,Y):-varon(X),padre.')).to.be.false;
        });
        
        it('isValidRule(hijo(X,Y):-varon(X),(Y,X).) should be false', function () {
            expect(validator.isValidRule('hijo(X,Y):-varon(X),(Y,X).')).to.be.false;
        });
        
        it('isValidRule(hijo(X,Y):-VARON(X),padre(Y,X).) should be false', function () {
            expect(validator.isValidRule('hijo(X,Y):-VARON(X),padre(Y,X).')).to.be.false;
        });
        
        it('isValidRule(hijo(kevin,Y):-varon(kevin),padre(Y,kevin).) should be false', function () {
            expect(validator.isValidRule('hijo(kevin,Y):-varon(kevin),padre(Y,kevin).')).to.be.false;
        });
        
        it('isValidRule(hijo_de_kevin(X):-varon(X),padre(kevin,X).) should be true', function () {
            expect(validator.isValidRule('hijo_de_kevin(X):-varon(X),padre(kevin,X).')).to.be.true;
        });
  
    });
    
    describe('Query validation', function () {

        it('varon(juan) should be true', function () {
            expect(validator.isValidQuery('varon(juan)')).to.be.true;
        });

        it('varon(juan). should be false', function () {
            expect(validator.isValidQuery('varon(juan).')).to.be.false;
        });
        
        it('varon() should be false', function () {
            expect(validator.isValidQuery('varon()')).to.be.false;
        });
        
        it('(juan) should be false', function () {
            expect(validator.isValidQuery('(juan)')).to.be.false;
        });
        
        it('hijo_de(pepe,juan) should be true', function () {
            expect(validator.isValidQuery('hijo_de(pepe,juan)')).to.be.true;
        });
        
        it('varon(juan,) should be false', function () {
            expect(validator.isValidQuery('varon(juan,)')).to.be.false;
        });
        
        it('varon(,juan) should be false', function () {
            expect(validator.isValidQuery('varon(,juan)')).to.be.false;
        });
        
        it('trillizas(maria,marta,ana) should be true', function () {
            expect(validator.isValidQuery('trillizas(maria,marta,ana)')).to.be.true;
        });
        
        it('Trillizas(maria,marta,ana) should be false', function () {
            expect(validator.isValidQuery('Trillizas(maria,marta,ana)')).to.be.false;
        });
        
        it('trillizas should be false', function () {
            expect(validator.isValidQuery('trillizas')).to.be.false;
        });
        
        it('suma(1,2) should be true', function () {
            expect(validator.isValidQuery('suma(1,2)')).to.be.true;
        });
        
        it('suma3(1,2) should be false', function () {
            expect(validator.isValidQuery('suma3(1,2)')).to.be.false;
        });
        
        it('varon(X) should be false', function () {
            expect(validator.isValidQuery('varon(X)')).to.be.false;
        });
        
        it('primo(X,pepe) should be false', function () {
            expect(validator.isValidQuery('varon(X,pepe)')).to.be.false;
        });

    });
    
});

