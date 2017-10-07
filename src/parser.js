var Parser = function () {

    var parameterSeparator = ",";
    var objectiveSeparatorIdentifier = /\),/g;
    var specialObjectiveSeparator = ";";
    var specialObjectiveSeparatorIdentifier = ")" + specialObjectiveSeparator;

    var queryRegex = /^([a-z]+[a-z_]*)\(([a-z0-9]+)(,[a-z0-9]+)*\)$/;
    var factRegex = /^([a-z]+[a-z_]*)\(([a-z0-9]+)(,[a-z0-9]+)*\)\.$/;
    var ruleRegex = /^([a-z]+[a-z_]*)\(([A-Z]+)(,[A-Z]+)*\):-([a-z]+[a-z-]*)\((\w+)(,\w+)*\)(,([a-z]+[a-z-]*)\((\w+)(,\w+)*\))*\.$/;
    
    var clausePredicateRegex = /^[a-z]+[a-z_]*/;

    var queryParametersRegex = /^.*\((.*)\)$/;
    var factParametersRegex = /^.*\((.*)\)\.$/;
    var ruleVariablesRegex = /^.*\((.*)\)\:-.*$/;

    var ruleObjectivesRegex = /^.*\(.*\)\:-(.*)\.$/;
    
    this.removeAllSpaces = function(clause) {
        return clause.replace(/\ /g, "");
    }

    this.isRule = function(clause) {
        return ruleRegex.test(clause);
    }
    
    this.isFact = function(clause) {
        return factRegex.test(clause);
    }
    
    this.validQuery = function(query) {
        return queryRegex.test(query);
    }
    
    this.obtainClausePredicate = function(clause) {
        var predicateIndex = 0;
        return clausePredicateRegex.exec(clause)[predicateIndex];
    }
    
    var obtainClauseParameters = function(clause, clauseParametersRegex) {
        var parametersIndex = 1;
        var parameterString = clauseParametersRegex.exec(clause)[parametersIndex];
        return parameterString.split(parameterSeparator);
    }
    
    this.obtainFactParameters = function(fact) {
        return obtainClauseParameters(fact, factParametersRegex);
    }
    
    this.obtainQueryParameters = function(query) {
        return obtainClauseParameters(query, queryParametersRegex);
    }
    
    this.obtainRuleVariables = function(rule) {
        return obtainClauseParameters(rule, ruleVariablesRegex);
    }
    
    var replaceObjectiveSeparator = function(objectives) {
        return objectives.replace(objectiveSeparatorIdentifier, specialObjectiveSeparatorIdentifier);
    }
    
    this.obtainRuleObjectives = function(rule) {
        var objectivesIndex = 1;
        var objectiveString = ruleObjectivesRegex.exec(rule)[objectivesIndex];
        return replaceObjectiveSeparator(objectiveString).split(specialObjectiveSeparator);
    }
    
    this.parseRuleObjectives = function(rule) {
        var parsedObjectivesList = [];
        var objectivesList = this.obtainRuleObjectives(rule);
        var objectivesListLength = objectivesList.length;

        for (var i = 0; i < objectivesListLength; i++) {
    	    var objective = objectivesList[i];
    	    parsedObjectivesList[i] = {
	        predicate: this.obtainClausePredicate(objective),
	    	parameters: this.obtainQueryParameters(objective)
	    };
        }
    	
        return parsedObjectivesList;
    }
    
    this.parseQuery = function(query) {
    	var cleanQuery = this.removeAllSpaces(query);
    	if (this.validQuery(cleanQuery)) {
    	    return {
    	        predicate: this.obtainClausePredicate(cleanQuery),
    	        parameters: this.obtainQueryParameters(cleanQuery)
    	    };
    	}
    	
    	throw new Error('Invalid query: ' + query);
    }
    
    this.parseFact = function(fact) {
    	return {
    	    predicate: this.obtainClausePredicate(fact),
    	    parameters: this.obtainFactParameters(fact)
    	};
    }
    
    this.parseRule = function(rule) {
        return {
            predicate: this.obtainClausePredicate(rule),
    	    variables: this.obtainRuleVariables(rule),
    	    objectives: this.parseRuleObjectives(rule)
    	};
    }

}

module.exports = Parser;
