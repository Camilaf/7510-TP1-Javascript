var Rule = function (predicate, variables, objectives) {
    var predicate = predicate;
    var variables = variables;
    var objectives = objectives;
    
    this.obtainPredicate = function() {
        return predicate;
    }
    
    this.obtainVariables = function() {
        return variables;
    }
    
    this.obtainObjectives = function() {
        return objectives;
    }
}

module.exports = Rule;
