var Validator = function () {

    var queryRegex = /^([a-z]+[a-z_]*)\(([a-z0-9]+)(,[a-z0-9]+)*\)$/;
    var factRegex = /^([a-z]+[a-z_]*)\(([a-z0-9]+)(,[a-z0-9]+)*\)\.$/;
    var ruleRegex = /^([a-z]+[a-z_]*)\(([A-Z]+)(,[A-Z]+)*\):-([a-z]+[a-z-]*)\((\w+)(,\w+)*\)(,([a-z]+[a-z-]*)\((\w+)(,\w+)*\))*\.$/;
    
    /* Receives a string 'clause' and indicates whether it is a valid rule or not. */
    this.isValidRule = function(clause) {
        return ruleRegex.test(clause);
    }
    
    /* Receives a string 'clause' and indicates whether it is a valid fact or not. */
    this.isValidFact = function(clause) {
        return factRegex.test(clause);
    }
    
    /* Receives a string 'query' and indicates whether it is a valid query or not. */
    this.isValidQuery = function(query) {
        return queryRegex.test(query);
    }

}

module.exports = Validator;
