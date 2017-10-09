var Objective = function (predicate, parameters) {
    var predicate = predicate;
    var parameters = parameters;
    
    /* Returns the predicate of the fact. */
    this.obtainPredicate = function() {
        return predicate;
    }
    
    /* Returns the parameters of the fact. */
    this.obtainParameters = function() {
        return parameters;
    }
    
    /* Receives a mapping and returns an object with the objective's 
     * predicate and the parameters of the objective instantiated 
     * by the mapping. */
    this.build = function(variablesMap) {
        var instantiatedParameters = parameters.map(function(parameter) {
            var queryParameter = variablesMap.get(parameter);
            if (queryParameter) {
                return queryParameter;
            } else {
                return parameter;
            }
        });
        
        return {
            predicate: predicate,
            parameters: instantiatedParameters
        }
    }
}

module.exports = Objective;
