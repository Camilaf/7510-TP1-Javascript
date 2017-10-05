var Fact = function (predicate, parameters) {
    var predicate = predicate;
    var parameters = parameters;
    
    this.obtainPredicate = function() {
        return predicate;
    }
    
    this.obtainParameters = function() {
        return parameters;
    }
}

module.exports = Fact;
