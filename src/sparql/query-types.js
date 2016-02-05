'use strict';

import GraphPattern from './graph-pattern';
import Triple from './triple';

export class Select {
    constructor(content, modifier) {
        this._content = content;
        this._modifier = modifier;
    }

    toString() {
        return `SELECT${this._modifier ? ` ${this._modifier}` : ''} ${this._content}`;
    }
}

export class Describe {
    constructor(content) {
        this._content = content;
    }

    toString() {
        return `DESCRIBE ${this._content}`;
    }
}

export class Ask {
    constructor() {

    }

    toString() {
        return 'ASK';
    }
}

export class Construct {
    constructor(triples) {
        this._constructTemplate = new GraphPattern(triples, false, false, ['Triple']);
    }

    addTriple(triple) {
        this._constructTemplate.addElement(triple);
    }

    toString() {
        return `DESCRIBE ${this._constructTemplate.toString()}`;
    }
}