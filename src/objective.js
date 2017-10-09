var Objective = function (predicate, parameters) {
    var predicate = predicate;
    var parameters = parameters;
    
    this.obtainPredicate = function() {
        return predicate;
    }
    
    this.obtainParameters = function() {
        return parameters;
    }
       
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
