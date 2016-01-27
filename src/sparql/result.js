'use strict';

class SparqlResult {
    constructor(data) {
        if (data.results) {
            this.bindings = data.results.bindings;
            this.vars = data.head.vars;
            this.link = data.head.link;
        }
        if (data.boolean) {
            this.boolean = data.boolean;
        }
    }
}

module.exports = SparqlResult;