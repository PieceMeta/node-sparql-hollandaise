'use strict';

class SparqlFilter {
    constructor(content) {
        this.content = content;
    }

    toString() {
        return `FILTER (${this.content})`;
    }
}

module.exports = SparqlFilter;