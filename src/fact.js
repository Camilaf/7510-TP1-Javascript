var Fact = function (predicate, parameters) {
    var predicate = predicate;
    var parameters = parameters;
    
    this.obtainPredicate = function() {
        return predicate;
    }
    
    this.obtainParameters = function() {
        return parameters;
    }
       
    this.samePredicate = function(query) {
        return predicate === query.predicate;
    }
    
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
}

module.exports = Fact;
