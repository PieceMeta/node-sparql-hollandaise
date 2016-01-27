'use strict';

var SparqlGraphPattern = require('./graph-pattern');

class SparqlGroupGraphPattern extends SparqlGraphPattern {
    constructor(elements) {
        super(elements, false, false, [SparqlGraphPattern]);
    }
}

module.exports = SparqlGroupGraphPattern;