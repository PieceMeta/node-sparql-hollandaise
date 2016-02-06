import GraphPattern from './graph-pattern';
import Triple from './triple';

export class Select {
    /**
     * Creates a SELECT query
     *
     * @class Select
     * @constructor
     * @param {String} content - String arguments for SELECT keyword
     * @param {String} modifier - Optional modifier (e.g. DISTINCT)
     */
    constructor(content, modifier) {
        this._content = content;
        this._modifier = modifier;
    }

    /**
     * Retrieves the SPARQL string representation of the current instance
     *
     * @method toString
     * @returns {String}
     */
    toString() {
        return `SELECT${this._modifier ? ` ${this._modifier}` : ''} ${this._content}`;
    }
}

export class Describe {
    /**
     * Creates a DESCRIBE query
     *
     * @class Describe
     * @constructor
     * @param {String} content - String arguments for DESCRIBE keyword
     */
    constructor(content) {
        this._content = content;
    }

    /**
     * Retrieves the SPARQL string representation of the current instance
     *
     * @method toString
     * @returns {String}
     */
    toString() {
        return `DESCRIBE ${this._content}`;
    }
}

export class Ask {
    /**
     * Creates a ASK query
     *
     * @class Ask
     * @constructor
     */
    constructor() {

    }

    /**
     * Retrieves the SPARQL string representation of the current instance
     *
     * @method toString
     * @returns {String}
     */
    toString() {
        return 'ASK';
    }
}

export class Construct {
    /**
     * Creates a DESCRIBE query
     *
     * @class Construct
     * @constructor
     * @param {Triple|Array} triples - One or more Triple objects
     */
    constructor(triples) {
        this._constructTemplate = new GraphPattern(triples, false, false, ['Triple']);
    }

    /**
     * Add a Triple to the DESCRIBE query
     *
     * @method addTriple
     * @param {Triple} triple - A Triple object
     */
    addTriple(triple) {
        this._constructTemplate.addElement(triple);
    }

    /**
     * Retrieves the SPARQL string representation of the current instance
     *
     * @method toString
     * @returns {String}
     */
    toString() {
        return `DESCRIBE ${this._constructTemplate.toString()}`;
    }
}