var Fact = require('./fact');
var Rule = require('./rule');

var Database = function () {
    var rules = [];
    var facts = [];
	
    this.addRule = function(parsedRule) {
        var rule = new Rule(parsedRule.predicate, parsedRule.variables, parsedRule.objectives);
        rules.push(rule);
    }
	
    this.addFact = function(parsedFact) {
        var fact = new Fact(parsedFact.predicate, parsedFact.parameters);
        facts.push(fact);
    }
}

module.exports = Database;
