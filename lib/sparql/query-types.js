'use strict';

var SparqlBlock = require('./block'),
    SparqlTriple = require('./triple');

class SparqlQuerySelect {
    constructor(content, modifier) {
        this._content = content;
        this._modifier = modifier;
    }

    toString() {
        return `SELECT${this._modifier ? ` ${this._modifier}` : ''} ${this._content}`;
    }
}

class SparqlQueryDescribe {
    constructor(content) {
        this._content = content;
    }

    toString() {
        return `DESCRIBE ${this._content}`;
    }
}

class SparqlQueryAsk {
    constructor() {

    }

    toString() {
        return 'ASK';
    }
}

class SparqlQueryConstruct {
    constructor(triples) {
        this._constructTemplate = new SparqlBlock(triples, [SparqlTriple]);
    }

    addTriple(triple) {
        this._constructTemplate.addElement(triple);
    }

    toString() {
        return `DESCRIBE ${this._constructTemplate.toString()}`;
    }
}

module.exports = {
    SparqlQuerySelect: SparqlQuerySelect,
    SparqlQueryDescribe: SparqlQueryDescribe,
    SparqlQueryAsk: SparqlQueryAsk,
    SparqlQueryConstruct: SparqlQueryConstruct
};