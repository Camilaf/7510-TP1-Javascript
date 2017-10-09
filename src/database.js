var Fact = require('./fact');
var Rule = require('./rule');
var Objective = require('./objective');

var Database = function () {
    var rules = [];
    var facts = [];
    
    /* Receives a parsed fact and adds its corresponding Fact object 
     * to the facts list. */
    this.addFact = function(parsedFact) {
        var fact = new Fact(parsedFact.predicate, parsedFact.parameters);
        facts.push(fact);
    }
    
    /* Receives a parsed rule and adds its corresponding Rule object 
     * to the rules list. */
    this.addRule = function(parsedRule) {
        var objectives = parsedRule.objectives.map(function(objective) {
            return new Objective(objective.predicate, objective.parameters);
        });
        
        var rule = new Rule(parsedRule.predicate, parsedRule.variables, objectives);
        rules.push(rule);
    }
    
    /* Receives a parsed fact query and determines if it is stored in 
     * the database. */
    this.hasFact = function(fact) {
        var numberOfFacts = facts.length;

        for (var i = 0; i < numberOfFacts; i++) {
            var dbFact = facts[i];
            if (dbFact.equalTo(fact)) {
                return true;
            }
        }
        return false;
    }
        
    /* Receives a rule and a query. If que query has the same number 
     * of parameters as the rule, it verifies that all the objectives 
     * of the rule are in the database and in that case returns true. */
    this.hasObjectives = function(rule, query) {
        var numberOfRuleVariables = rule.obtainVariables().length;
        var numberOfQueryParameters = query.parameters.length;
        var numberOfRuleObjectives = rule.obtainObjectives().length;
        var ruleObjectives = rule.obtainObjectives();

        if (numberOfRuleVariables != numberOfQueryParameters) {
            return false;
        }
        
        var variablesMap = rule.mapVariables(query.parameters);
        
        for (var i = 0; i < numberOfRuleObjectives; i++) { 
            var objective = ruleObjectives[i];
            var newFact = objective.build(variablesMap);
            
            if (!this.hasFact(newFact)) {
                return false;
            }
        }
        
        return true;
    }
    
    /* Receives a parsed rule query and determines whether it is true
     * or false. */
    this.hasRule = function(rule) {
        var numberOfRules = rules.length;

        for (var i = 0; i < numberOfRules; i++) {
            var dbRule = rules[i];
            if (dbRule.samePredicate(rule) && this.hasObjectives(dbRule, rule)) {
                return true;
            }
        }
        
        return false;
    }
}

module.exports = Database;
