var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter: invalid queries", function () {

    var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "mujer(pepa).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(juan, pepita).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var interpreter = null;

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    it('varon() should throw \'Invalid entry in database: varon()\'', function () {
        expect(() => {interpreter.checkQuery('varon()')}).to.throw('Invalid query: varon()');
    });
        
    it('varon(_) should throw \'Invalid entry in database: varon(_)\'', function () {
        expect(() => {interpreter.checkQuery('varon(_)')}).to.throw('Invalid query: varon(_)');
    });
        
    it('varon(X) should throw \'Invalid entry in database: varon(X)\'', function () {
        expect(() => {interpreter.checkQuery('varon(X)')}).to.throw('Invalid query: varon(X)');
    });
        
    it('(juan) should throw \'Invalid entry in database: (juan)\'', function () {
        expect(() => {interpreter.checkQuery('(juan)')}).to.throw('Invalid query: (juan)');
    });
        
    it('_(juan) should throw \'Invalid entry in database: _(juan)\'', function () {
        expect(() => {interpreter.checkQuery('_(juan)')}).to.throw('Invalid query: _(juan)');
    });
        
    it('prima(maria,) should throw \'Invalid entry in database: prima(maria,)\'', function () {
        expect(() => {interpreter.checkQuery('prima(maria,)')}).to.throw('Invalid query: prima(maria,)');
    });
        
    it('prima(maria, pau should throw \'Invalid entry in database: prima(maria, pau\'', function () {
        expect(() => {interpreter.checkQuery('prima(maria, pau')}).to.throw('Invalid query: prima(maria, pau');
    });
        
    it('prima(, pau) should throw \'Invalid entry in database: prima(, pau)\'', function () {
        expect(() => {interpreter.checkQuery('prima(, pau)')}).to.throw('Invalid query: prima(, pau)');
    });
        
    it('prima( should throw \'Invalid entry in database: prima(\'', function () {
        expect(() => {interpreter.checkQuery('prima(')}).to.throw('Invalid query: prima(');
    });
        
    it('Prima(lu, pau) should throw \'Invalid entry in database: Prima(lu, pau)\'', function () {
        expect(() => {interpreter.checkQuery('Prima(lu, pau)')}).to.throw('Invalid query: Prima(lu, pau)');
    });
        
    it('prima should throw \'Invalid entry in database: prima\'', function () {
        expect(() => {interpreter.checkQuery('prima')}).to.throw('Invalid query: prima');
    });
    
    it(' should throw \'Invalid entry in database: \'', function () {
        expect(() => {interpreter.checkQuery('')}).to.throw('Invalid query: ');
    });

});

describe("Interpreter: incomplete database", function () {

    var incompleteDatabase_1 = [
        "varon(juan).",
        "varon(pepe).",
        "varon().",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];
    
    var incompleteDatabase_2 = [
        "varon(juan).",
        "varon(pepe)",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];
    
    var incompleteDatabase_3 = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "mujer(pepa).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(juan, pepita).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "HIJA(X, Y) :- mujer(X), padre(Y, X)."
    ];
    
    var incompleteDatabase_4 = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "(pepa).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(juan, pepita).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];
    
    var incompleteDatabase_5 = [
        "varon(X).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "mujer(pepa).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(juan, pepita).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];
    
    var incompleteDatabase_6 = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "mujer(pepa).",
        "padre.",
        "padre(juan, pepa).",
        "padre(juan, pepita).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];
    
    var incompleteDatabase_7 = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "mujer(pepa).",
        "padre(juan, ).",
        "padre(juan, pepa).",
        "padre(juan, pepita).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];
    
    var incompleteDatabase_8 = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "mujer(pepa).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(, pepita).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];
    
    var incompleteDatabase_9 = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "mujer(pepa).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(juan, pepita).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];
    
    var incompleteDatabase_10 = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "mujer(pepa).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(juan, pepita).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), .",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];
    
    var incompleteDatabase_11 = [
        "varon(juan).",
        "varon(pepe).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- MUJER(X), padre(Y, X)."
    ];
    
    var incompleteDatabase_12 = [
        "varon(juan).",
        "varon(pepe).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- , padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];
    
    var incompleteDatabase_13 = [
        "varon(juan).",
        "varon(pepe).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y)  mujer(X), padre(Y, X)."
    ];
    
    var incompleteDatabase_14 = [
        "varon(juan).",
        "varon(pepe).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- ."
    ];
    
    var incompleteDatabase_15 = [
        "varon(juan).",
        "varon(pepe).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y)."
    ];

    var interpreter = null;

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
    });

    it('varon(). should throw \'Invalid entry in database: varon().\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_1)}).to.throw('Invalid entry in database: varon().');
    });
    
    it('varon(pepe) should throw \'Invalid entry in database: varon(pepe)\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_2)}).to.throw('Invalid entry in database: varon(pepe)');
    });
    
    it('HIJA(X, Y) :- mujer(X), padre(Y, X). should throw \'Invalid entry in database: HIJA(X, Y) :- mujer(X), padre(Y, X).\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_3)}).to.throw('Invalid entry in database: HIJA(X, Y) :- mujer(X), padre(Y, X).');
    });
    
    it('(pepa). should throw \'Invalid entry in database: (pepa).\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_4)}).to.throw('Invalid entry in database: (pepa).');
    });
    
    it('varon(X). should throw \'Invalid entry in database: varon(X).\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_5)}).to.throw('Invalid entry in database: varon(X).');
    });
    
    it('padre. should throw \'Invalid entry in database: padre.\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_6)}).to.throw('Invalid entry in database: padre.');
    });
    
    it('padre(juan, ). should throw \'Invalid entry in database: padre(juan, ).\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_7)}).to.throw('Invalid entry in database: padre(juan, ).');
    });
    
    it('padre(, pepita). should throw \'Invalid entry in database: padre(, pepita).\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_8)}).to.throw('Invalid entry in database: padre(, pepita).');
    });
    
    it('hijo(X, Y) :- varon(), padre(Y, X). should throw \'Invalid entry in database: hijo(X, Y) :- varon(), padre(Y, X).\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_9)}).to.throw('Invalid entry in database: hijo(X, Y) :- varon(), padre(Y, X).');
    });
    
    it('hijo(X, Y) :- varon(X), . should throw \'Invalid entry in database: hijo(X, Y) :- varon(X), .\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_10)}).to.throw('Invalid entry in database: hijo(X, Y) :- varon(X), .');
    });
    
    it('hija(X, Y) :- MUJER(X), padre(Y, X). should throw \'Invalid entry in database: hija(X, Y) :- MUJER(X), padre(Y, X).\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_11)}).to.throw('Invalid entry in database: hija(X, Y) :- MUJER(X), padre(Y, X).');
    });
    
    it('hijo(X, Y) :- , padre(Y, X). should throw \'Invalid entry in database: hijo(X, Y) :- , padre(Y, X).\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_12)}).to.throw('Invalid entry in database: hijo(X, Y) :- , padre(Y, X).');
    });
    
    it('hija(X, Y)  mujer(X), padre(Y, X). should throw \'Invalid entry in database: hija(X, Y)  mujer(X), padre(Y, X).\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_13)}).to.throw('Invalid entry in database: hija(X, Y)  mujer(X), padre(Y, X).');
    });
    
    it('hija(X, Y) :- . should throw \'Invalid entry in database: hija(X, Y) :- .\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_14)}).to.throw('Invalid entry in database: hija(X, Y) :- .');
    });
    
    it('hija(X, Y). should throw \'Invalid entry in database: hija(X, Y).\'', function () {
        expect(() => {interpreter.parseDB(incompleteDatabase_15)}).to.throw('Invalid entry in database: hija(X, Y).');
    });

});

describe("Interpreter: number database tests", function () {

    var db = [
        "add(zero, zero, zero).",
        "add(zero, one, one).",
        "add(zero, two, two).",
        "add(one, zero, one).",
        "add(one, one, two).",
        "add(one, two, zero).",
        "add(two, zero, two).",
        "add(two, one, zero).",
        "add(two, two, one).",
        "subtract(X, Y, Z) :- add(Y, Z, X)."
    ];
	
    var interpreter = null;

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    describe('Check queries', function () {

        it('add(one, one, two) should be true', function () {
            assert(interpreter.checkQuery('add(one, one, two)'));
        });

        it('add(two, one, one) should be false', function () {
            assert(interpreter.checkQuery('add(two, one, one)') === false);
        });
        
        it('add(two, one) should be false', function () {
            assert(interpreter.checkQuery('add(two, one)') === false);
        });
        
        it('divide(two, one) should be false', function () {
            assert(interpreter.checkQuery('divide(two, one)') === false);
        });

        it('subtract(one, one, two) should be false', function () {
            assert(interpreter.checkQuery('subtract(one, one, two)') === false);
        });
        
        it('subtract(one, one) should be false', function () {
            assert(interpreter.checkQuery('subtract(two, one)') === false);
        });
        
        it('subtract(two, one, one) should be true', function () {
            assert(interpreter.checkQuery('subtract(two, one, one)') === true);
        });
        
        it('checkQuery(varon())', function () {
            expect(() => { interpreter.checkQuery('varon()') }).to.throw('Invalid query: varon()');
        });
        
        it('checkQuery(varon(juan,))', function () {
            expect(() => { interpreter.checkQuery('varon(juan,)') }).to.throw('Invalid query: varon(juan,)');
        });
        
        it('checkQuery(varon(, pepe))', function () {
            expect(() => { interpreter.checkQuery('varon(, pepe)') }).to.throw('Invalid query: varon(, pepe)');
        });
        
        it('checkQuery((nico))', function () {
            expect(() => { interpreter.checkQuery('(nico)') }).to.throw('Invalid query: (nico)');
        });
        
        it('checkQuery(varon(X))', function () {
            expect(() => { interpreter.checkQuery('varon(X)') }).to.throw('Invalid query: varon(X)');
        });
        
        it('checkQuery(varon))', function () {
            expect(() => { interpreter.checkQuery('varon)') }).to.throw('Invalid query: varon)');
        });
        
        it('checkQuery(varon)', function () {
            expect(() => { interpreter.checkQuery('varon') }).to.throw('Invalid query: varon');
        });
        
        it('checkQuery(Varon(lucas))', function () {
            expect(() => { interpreter.checkQuery('Varon(lucas)') }).to.throw('Invalid query: Varon(lucas)');
        });
        
        it('checkQuery(_(lucas))', function () {
            expect(() => { interpreter.checkQuery('_(lucas)') }).to.throw('Invalid query: _(lucas)');
        });
        
        it('checkQuery(varon(,))', function () {
            expect(() => { interpreter.checkQuery('varon(,)') }).to.throw('Invalid query: varon(,)');
        });

    });

});

