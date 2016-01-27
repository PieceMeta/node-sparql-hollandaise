'use strict';

class SparqlTriple {
    constructor(...args) {
        var splitTriple = [null, null, null];
        if (args.length === 3) {
            splitTriple = args;
        } else if (args.length === 1 && typeof args[0] === 'string') {
            splitTriple = args[0].split(' ');
        }
        this.subject = splitTriple[0];
        this.predicate = splitTriple[1];
        this.object = splitTriple[2];
    }

    toString() {
        return `${this.subject} ${this.predicate} ${this.object}`;
    }
}

module.exports = SparqlTriple;