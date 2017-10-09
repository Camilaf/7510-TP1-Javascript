var Rule = function (predicate, variables, objectives) {
    var predicate = predicate;
    var variables = variables;
    var objectives = objectives;
    
    /* Returns the predicate of the rule. */
    this.obtainPredicate = function() {
        return predicate;
    }
    
    /* Returns the variables of the rule. */
    this.obtainVariables = function() {
        return variables;
    }
    
    /* Returns the objectives of the rule. */
    this.obtainObjectives = function() {
        return objectives;
    }
    
    /* Receives a query and returns true if it has the same predicate
     * as the rule. */
    this.samePredicate = function(query) {
        return predicate === query.predicate;
    }
    
    /* Receives the parameters of a query and maps each rule variable
     * to its corresponding query parameter. Returns the created map. */
    this.mapVariables = function(queryParameters) {
        return new Map (variables.map(function(variable, index) {
            return [variable, queryParameters[index]]; 
        }));
    }    
}

module.exports = Rule;
