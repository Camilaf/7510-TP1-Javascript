var Database = require('./database');
var Parser = require('./parser');
var Validator = require('./validator');

var Interpreter = function () {
    var database = new Database();
    var parser = new Parser();
    var validator = new Validator();
    
    /* Receives a list of clauses and adds them to the database. If one clause 
     * can't be parsed, throws an Error. */
    this.parseDB = function (databaseList) {
        var numberOfClauses = databaseList.length;
        
        for (var i = 0; i < numberOfClauses; i++) {
            var clause = databaseList[i];
            var cleanClause = parser.removeAllSpaces(clause);
            
            if (validator.isValidFact(cleanClause)) {
                var parsedFact = parser.parseFact(cleanClause);
                database.addFact(parsedFact);
                
            } else if (validator.isValidRule(cleanClause)) {
                var parsedRule = parser.parseRule(cleanClause);
                database.addRule(parsedRule);
                
            } else {
                throw new Error('Invalid entry in database: ' + clause);
            }
        }
    }
    
    /* Receives a string 'query' and returns true if the rules and facts
     * in the database imply query, false if not. If the query can't be
     * parsed, throws an Error. */
    this.checkQuery = function (query) {
        var cleanQuery = parser.removeAllSpaces(query);
        
        if (!validator.isValidQuery(cleanQuery)) {
            throw new Error('Invalid query: ' + query);
        }
        var parsedQuery = parser.parseQuery(cleanQuery);      
        return database.hasFact(parsedQuery) || database.hasRule(parsedQuery);
    }

}

module.exports = Interpreter;
