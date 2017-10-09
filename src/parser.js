var Parser = function () {

    this.removeAllSpaces = function(clause) {
        return clause.replace(/\ /g, "");
    }
    
    this.obtainClausePredicate = function(clause) {
        var clausePredicateRegex = /^[a-z]+[a-z_]*/;
        var predicateIndex = 0;
        return clausePredicateRegex.exec(clause)[predicateIndex];
    }
    
    var obtainClauseParameters = function(clause, clauseParametersRegex) {
        var parametersIndex = 1;
        var parameterString = clauseParametersRegex.exec(clause)[parametersIndex];
        var parameterSeparator = ",";
        return parameterString.split(parameterSeparator);
    }
    
    this.obtainFactParameters = function(fact) {
        var factParametersRegex = /^.*\((.*)\)\.$/;
        return obtainClauseParameters(fact, factParametersRegex);
    }
    
    this.obtainQueryParameters = function(query) {
        var queryParametersRegex = /^.*\((.*)\)$/;
        return obtainClauseParameters(query, queryParametersRegex);
    }
    
    this.obtainRuleVariables = function(rule) {
        var ruleVariablesRegex = /^.*\((.*)\)\:-.*$/;
        return obtainClauseParameters(rule, ruleVariablesRegex);
    }
    
    this.parseQuery = function(query) {
    	return {
    	    predicate: this.obtainClausePredicate(query),
    	    parameters: this.obtainQueryParameters(query)
    	};
    }
    
    this.parseFact = function(fact) {
    	return {
    	    predicate: this.obtainClausePredicate(fact),
    	    parameters: this.obtainFactParameters(fact)
    	};
    }
    
    var replaceObjectiveSeparator = function(objectives) {
        var objectiveSeparatorIdentifier = /\),/g;
        var specialObjectiveSeparatorIdentifier = ");";
        return objectives.replace(objectiveSeparatorIdentifier, specialObjectiveSeparatorIdentifier);
    }
    
    this.obtainRuleObjectives = function(rule) {
        var ruleObjectivesRegex = /^.*\(.*\)\:-(.*)\.$/;
        var objectivesIndex = 1;
        var objectiveString = ruleObjectivesRegex.exec(rule)[objectivesIndex];
        var specialObjectiveSeparator = ";";
        return replaceObjectiveSeparator(objectiveString).split(specialObjectiveSeparator);
    }
    
    this.parseRuleObjectives = function(rule) {
        var parsedObjectivesList = [];
        var objectivesList = this.obtainRuleObjectives(rule);
        var numberOfObjectives = objectivesList.length;

        for (var i = 0; i < numberOfObjectives; i++) {
    	    var objective = objectivesList[i];
    	    parsedObjectivesList[i] = this.parseQuery(objective);
        }
    	
        return parsedObjectivesList;
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
