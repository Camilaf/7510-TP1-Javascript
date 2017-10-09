var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

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
        "hija(X, Y) :- mujer(X), padre(Y, X).",
        "nieto(X, Y) :- varon(X), abuelo(Y, X).",
        "padre_de_ana(juan).",
        "hija_de_hector(X) :- mujer(X), padre(hector, X)."
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    afterEach(function () {
        // runs after each test in this block
    });


    describe('Interpreter Facts', function () {

        it('varon(juan) should be true', function () {
            assert(interpreter.checkQuery('varon(juan)'));
        });

        it('varon(maria) should be false', function () {
            assert(interpreter.checkQuery('varon(maria)') === false);
        });

        it('mujer(cecilia) should be true', function () {
            assert(interpreter.checkQuery('mujer(cecilia)'));
        });

        it('padre(juan, pepe) should be true', function () {
            assert(interpreter.checkQuery('padre(juan, pepe)') === true);
        });

        it('padre(mario, pepe) should be false', function () {
            assert(interpreter.checkQuery('padre(mario, pepe)') === false);
        });

        it('primo(juan, emi) should be false', function () {
            assert(interpreter.checkQuery('primo(juan, emi)') === false);
        });
        
        it('amigo(hect, lean) should be false', function () {
            assert(interpreter.checkQuery('amigo(hect, lean)') === false);
        });
        
        it('padre(juan,pepe) should be true', function () {
            assert(interpreter.checkQuery('padre(juan,pepe)') === true);
        });
        
        it('padre(pepe, juan) should be false', function () {
            assert(interpreter.checkQuery('padre(pepe, juan)') === false);
        });
        
        it('abuelo(pepe, juan) should be false', function () {
            assert(interpreter.checkQuery('abuelo(pepe, juan)') === false);
        });
        
        it('padre_de_ana(juan) should be true', function () {
            assert(interpreter.checkQuery('padre_de_ana(juan)') === true);
        });
        
        it('padre_de_ana(jorge) should be false', function () {
            assert(interpreter.checkQuery('padre_de_ana(jorge)') === false);
        });

    });

    describe('Interpreter Rules', function () {

        it('hijo(pepe, juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === true);
        });
        
        it('hijo(pepe,juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe,juan)') === true);
        });
        
        it('hija(maria, roberto) should be false', function () {
            assert(interpreter.checkQuery('hija(maria, roberto)') === false);
        });
        
        it('hijo(juan, pepe) should be false', function () {
            assert(interpreter.checkQuery('hijo(juan, pepe)') === false);
        });

        it('hijo(pepa, juan) should be false', function () {
            assert(interpreter.checkQuery('hijo(pepa, juan)') === false);
        });
        
        it('hija(pepa, juan) should be true', function () {
            assert(interpreter.checkQuery('hija(pepa, juan)') === true);
        });
        
        it('hija(pepita, juan) should be false', function () {
            assert(interpreter.checkQuery('hija(pepita, juan)') === false);
        });
        
        it('hijo(alejandro, roberto) should be true', function () {
            assert(interpreter.checkQuery('hijo(alejandro, roberto)') === true);
        });
        
        it('hijo(roberto, alejandro) should be false', function () {
            assert(interpreter.checkQuery('hijo(roberto, alejandro)') === false);
        });
        
        it('hija(alejandro, roberto) should be false', function () {
            assert(interpreter.checkQuery('hija(alejandro, roberto)') === false);
        });
        
        it('hijo(alejandro, juan) should be false', function () {
            assert(interpreter.checkQuery('hijo(alejandro, juan)') === false);
        });
        
        it('nieto(alejandro, juan) should be false', function () {
            assert(interpreter.checkQuery('nieto(alejandro, juan)') === false);
        });
        
        it('hija_de_hector(maria) should be true', function () {
            assert(interpreter.checkQuery('hija_de_hector(maria)') === true);
        });
        
        it('hija_de_hector(fran) should be false', function () {
            assert(interpreter.checkQuery('hija_de_hector(fran)') === false);
        });
        
        it('hija_de_hector(cecilia) should be false', function () {
            assert(interpreter.checkQuery('hija_de_hector(cecilia)') === false);
        });

    });

});


