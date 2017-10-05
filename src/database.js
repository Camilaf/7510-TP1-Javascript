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
    
    this.buildObjective = function(objective, variablesMap) {
        var instantiatedParameters = objective.parameters.map(function(parameter) {
            var queryParameter = variablesMap.get(parameter);
            if (queryParameter) {
                return queryParameter;
            } else {
                return parameter;
            }
        });
        
        return {
            predicate: objective.predicate,
            parameters: instantiatedParameters
        }
    }
    
    this.hasObjectives = function(rule, query) {
        var ruleVariables = rule.obtainVariables();
        var queryParameters = query.parameters;

        if (ruleVariables.length != queryParameters.length) {
            return false;
        }
        
        var variablesMap = new Map (ruleVariables.map(function(variable, index) {
            return [variable, queryParameters[index]]; 
        }));
        
        for (var i = 0; i < rule.obtainObjectives().length; i++) {
            var objective = this.buildObjective(rule.obtainObjectives()[i], variablesMap); 
            if (!this.hasFact(objective)) {
                return false;
            }
        }
        
        return true;
    }
	
    this.hasRule = function(rule) {
        var rulesListLength = rules.length;

        for (var i = 0; i < rulesListLength; i++) {
            var dbRule = rules[i];
            if ((samePredicate(dbRule, rule) && (this.hasObjectives(dbRule, rule)))) {
                return true;
            }
        }
        
        return false;
    }
}

module.exports = Database;
