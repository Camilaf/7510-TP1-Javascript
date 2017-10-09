var Validator = function () {

    var queryRegex = /^([a-z]+[a-z_]*)\(([a-z0-9]+)(,[a-z0-9]+)*\)$/;
    var factRegex = /^([a-z]+[a-z_]*)\(([a-z0-9]+)(,[a-z0-9]+)*\)\.$/;
    var ruleRegex = /^([a-z]+[a-z_]*)\(([A-Z]+)(,[A-Z]+)*\):-([a-z]+[a-z-]*)\((\w+)(,\w+)*\)(,([a-z]+[a-z-]*)\((\w+)(,\w+)*\))*\.$/;
    
    this.isValidRule = function(clause) {
        return ruleRegex.test(clause);
    }
    
    this.isValidFact = function(clause) {
        return factRegex.test(clause);
    }
    
    this.isValidQuery = function(query) {
        return queryRegex.test(query);
    }

}

module.exports = Validator;
