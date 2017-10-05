var Fact = require('./fact');
var Rule = require('./rule');

var Database = function () {
    var rules = [];
    var facts = [];
	
    this.addRule = function(parsedRule) {
        var rule = new Rule(parsedRule.predicate, parsedRule.variables, parsedRule.objectives);
        rules.push(rule);
    }
	
    this.addFact = function(parsedFact) {
        var fact = new Fact(parsedFact.predicate, parsedFact.parameters);
        facts.push(fact);
    }
    
    var samePredicate = function(clause, query) {
        return clause.obtainPredicate() === query.predicate;
    }
    
    var sameParameters = function(clause, query) {
        var clauseParameters = clause.obtainParameters();
        var queryParameters = query.parameters;
        
        if (clauseParameters.length != queryParameters.length) {
            return false;
        }
        
        var parametersLength = clauseParameters.length;
        for (var i = 0; i < parametersLength; i++) {
            if (clauseParameters[i] != queryParameters[i])
                return false;
        }
        
        return true;
    }
    
    this.hasFact = function(fact) {
        var factsListLength = facts.length;

        for (var i = 0; i < factsListLength; i++) {
            var dbFact = facts[i];
            if (samePredicate(dbFact, fact) && sameParameters(dbFact, fact)) {
                return true;
            }
        }
	
        return false;
    }
    
    
}

module.exports = Database;
