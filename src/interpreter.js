var Database = require('./database');
var Parser = require('./parser');

var Interpreter = function () {
    var database = new Database();
    var parser = new Parser();
    
    this.parseDB = function (databaseList) {
        var databaseListLength = databaseList.length;
        
        for (var i = 0; i < databaseListLength; i++) {
            var clause = databaseList[i];
            var cleanClause = parser.removeAllSpaces(clause);
            
            if (parser.isFact(cleanClause)) {
                var parsedFact = parser.parseFact(cleanClause);
                database.addFact(parsedFact);
                
            } else if (parser.isRule(cleanClause)) {
                var parsedRule = parser.parseRule(cleanClause);
                database.addRule(parsedRule);
                
            } else {
                throw new Error('Invalid entry in database: ' + clause);
            }
        }
    }

    this.checkQuery = function (query) {
        var parsedQuery = parser.parseQuery(query);      
        return (database.hasFact(parsedQuery) || database.hasRule(parsedQuery));
    }

}

module.exports = Interpreter;
