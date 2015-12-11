'use strict';

class SparqlPrefix {
    constructor(value) {
        this.value = value.replace(/^PREFIX /, '');
    }

    toString() {
        return `PREFIX ${this.value}`;
    }
}

module.exports = SparqlPrefix;