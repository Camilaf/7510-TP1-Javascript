var Parser = function () {

    /* Receives a string 'clause' and removes spaces from it. */
    this.removeAllSpaces = function(clause) {
        return clause.replace(/\ /g, "");
    }
    
    /* Returns the predicate of the given string 'clause'. */
    this.obtainClausePredicate = function(clause) {
        var clausePredicateRegex = /^[a-z]+[a-z_]*/;
        var predicateIndex = 0;
        return clausePredicateRegex.exec(clause)[predicateIndex];
    }
    
    /* Returns the parameters of the given string 'clause', according to 
     * the regular expression. */
    var obtainClauseParameters = function(clause, clauseParametersRegex) {
        var parametersIndex = 1;
        var parameterString = clauseParametersRegex.exec(clause)[parametersIndex];
        var parameterSeparator = ",";
        return parameterString.split(parameterSeparator);
    }
    
    /* Returns the parameters of the given fact. */
    this.obtainFactParameters = function(fact) {
        var factParametersRegex = /^.*\((.*)\)\.$/;
        return obtainClauseParameters(fact, factParametersRegex);
    }
    
    /* Returns the parameters of the given query. */
    this.obtainQueryParameters = function(query) {
        var queryParametersRegex = /^.*\((.*)\)$/;
        return obtainClauseParameters(query, queryParametersRegex);
    }
    
    /* Returns the variables of the given rule. */
    this.obtainRuleVariables = function(rule) {
        var ruleVariablesRegex = /^.*\((.*)\)\:-.*$/;
        return obtainClauseParameters(rule, ruleVariablesRegex);
    }
    
    /* Returns an object with the predicate and parameters of the query. */
    this.parseQuery = function(query) {
    	return {
    	    predicate: this.obtainClausePredicate(query),
    	    parameters: this.obtainQueryParameters(query)
    	};
    }
    
    /* Returns an object with the predicate and parameters of the fact. */
    this.parseFact = function(fact) {
    	return {
    	    predicate: this.obtainClausePredicate(fact),
    	    parameters: this.obtainFactParameters(fact)
    	};
    }
    
    /* Receives a string with the objectives of a rule and returns a string
     * with the objectives separated by the special objective separator ';'. */
    var replaceObjectiveSeparator = function(objectives) {
        var objectiveSeparatorIdentifier = /\),/g;
        var specialObjectiveSeparatorIdentifier = ");";
        return objectives.replace(objectiveSeparatorIdentifier, specialObjectiveSeparatorIdentifier);
    }
    
    /* Returns the objectives of the given string 'rule'. */
    this.obtainRuleObjectives = function(rule) {
        var ruleObjectivesRegex = /^.*\(.*\)\:-(.*)\.$/;
        var objectivesIndex = 1;
        var objectiveString = ruleObjectivesRegex.exec(rule)[objectivesIndex];
        var specialObjectiveSeparator = ";";
        return replaceObjectiveSeparator(objectiveString).split(specialObjectiveSeparator);
    }
    
    /* Receives a rule and returns a list of parsed objectives. Each element of 
     * the list is an object with predicate and parameters. */
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
    
    /* Returns an object with the predicate, variables and objectives of
     * the rule. */
    this.parseRule = function(rule) {
        return {
            predicate: this.obtainClausePredicate(rule),
    	    variables: this.obtainRuleVariables(rule),
    	    objectives: this.parseRuleObjectives(rule)
    	};
    }

}

module.exports = Parser;
