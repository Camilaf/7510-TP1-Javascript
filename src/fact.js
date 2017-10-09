var Fact = function (predicate, parameters) {
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
    
    /* Receives a query and returns true if it has the same predicate
     * as the fact. */
    this.samePredicate = function(query) {
        return predicate === query.predicate;
    }
    
    /* Receives a query and returns true if it has the same parameters
     * as the fact. */
    this.sameParameters = function(query) {
        if (parameters.length != query.parameters.length) {
            return false;
        }
        
        for (var i = 0; i < parameters.length; i++) {
            if (parameters[i] != query.parameters[i])
                return false;
        }
        
        return true;
    }
    
    /* Receives a query and returns true if it has the same predicate and 
     * parameters as the fact. */
    this.equalTo = function(query) {
        return this.samePredicate(query) && this.sameParameters(query);
    }
}

module.exports = Fact;
