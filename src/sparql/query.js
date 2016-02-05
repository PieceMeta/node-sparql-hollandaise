'use strict';

import Transport from './transport';
import Prefix from './prefix';
import GraphPattern from './graph-pattern';
import GroupGraphPattern from './group-graph-pattern';
import * as QueryTypes from './query-types';

export default class Query {
    /**
     * The Query is the root object for all SPARQL requests
     *
     * @class Query
     * @constructor
     * @param {String} endpoint - URL of the SPARQL endpoint
     */
    constructor(endpoint) {
        this.reset();
        this._transport = new Transport(endpoint);
    }

    /**
     * Sets the base IRI
     *
     * @method base
     * @param {String} content - BASE string
     */
    base(content) {
        this._config.base = content;
    }

    /**
     * Sets the prefix(es) for the query
     *
     * @method prefix
     * @param {Prefix|String|Array} content - A single Prefix string or object or an array of Prefix objects or strings
     * @returns {Query} - Returns current instance (chainable)
     */
    prefix(content) {
        this.addArrayOrSingle(content, this.addPrefix);
        return this;
    }

    /**
     * Add a prefix to the query
     *
     * @method addPrefix
     * @param {Prefix|String|Array} content - A single Prefix string or object
     */
    addPrefix(content) {
        if (content instanceof Prefix) {
            this._config.prefixes.push(content);
        } else if (typeof content === 'string') {
            this._config.prefixes.push(new Prefix(content));
        }
    }

    /**
     * Get the Prefix objects of the Query
     *
     * @method getPrefixes
     * @returns {Array}
     */
    getPrefixes() {
        return this._config.prefixes;
    }

    /**
     * Remove all Prefixes from the Query
     *
     * @method clearPrefixes
     */
    clearPrefixes() {
        this._config.prefixes = [];
    }

    /**
     * Set the current query to SELECT
     *
     * @method select
     * @param {String} content - Arguments given to the SELECT statement
     * @param {String} modifier - Optional modifier to be added (e.g. DISTINCT)
     * @returns {Query} - Returns current instance (chainable)
     */
    select(content, modifier) {
        this._config.query = new QueryTypes.Select(content, modifier);
        return this;
    }

    /**
     * Set the current query to DESCRIBE
     *
     * @method describe
     * @param {String} content - Arguments given to the DESCRIBE statement
     * @returns {Query} - Returns current instance (chainable)
     */
    describe(content) {
        this._config.query = new QueryTypes.Describe(content);
        return this;
    }

    /**
     * Set the current query to ASK
     *
     * @method ask
     * @returns {Query} - Returns current instance (chainable)
     */
    ask() {
        this._config.query = new QueryTypes.Ask();
        return this;
    }

    /**
     * Set the current query to CONSTRUCT
     *
     * @method construct
     * @param {Triple|Array} triples - One or more Triples to be used for a DESCRIBE GraphPattern
     * @returns {Query} - Returns current instance (chainable)
     */
    construct(triples) {
        this._config.query = new QueryTypes.Construct(triples);
        return this;
    }

    /**
     * Set dataset clause
     *
     * @method from
     * @param {String|Array} content - One or more strings with dataset clauses (without FROM or NAMED)
     * @param {Boolean} named - Optional flag to set clause to NAMED
     * @returns {Query} - Returns current instance (chainable)
     */
    from(content, named = false) {
        this.addArrayOrSingle(content, (element) => {
            this._config.datasetClause.push(`FROM${named ? ' NAMED' : ''} ${element}`);
        });
        return this;
    }

    /**
     * Get current dataset clauses
     *
     * @method getDatasetClauses
     * @returns {Array}
     */
    getDatasetClauses() {
        return this._config.datasetClause;
    }

    /**
     * Clear current dataset clauses
     *
     * @method clearDatasetClauses
     */
    clearDatasetClauses() {
        this._config.datasetClause = [];
    }

    /**
     * Set where clause
     *
     * @method where
     * @param {String|Array} content - A GraphPattern or a GroupGraphPattern object
     * @returns {Query} - Returns current instance (chainable)
     */
    where(content) {
        if (content instanceof GraphPattern ||
            content instanceof GroupGraphPattern) {
            this._config.whereClause = content;
        } else {
            throw new Error('TypeError: Where clause must be a graph pattern.');
        }
        return this;
    }

    /**
     * Get current where clause
     *
     * @method getWhereClause
     * @returns {GraphPattern|GroupGraphPattern}
     */
    getWhereClause() {
        return this._config.whereClause;
    }

    /**
     * Set order for query
     *
     * @method order
     * @param {String} content - Order string without ORDER BY
     * @returns {Query} - Returns current instance (chainable)
     */
    order(content) {
        if (typeof content === 'string') {
            this._config.solutionModifiers.push(`ORDER BY ${content}`);
        } else {
            throw new Error(`Input for ORDER must be string but is ${typeof content}.`);
        }
        return this;
    }

    /**
     * Set limit for query
     *
     * @method limit
     * @param {Number} count - Limit count
     * @returns {Query} - Returns current instance (chainable)
     */
    limit(count) {
        if (typeof count === 'number') {
            this._config.solutionModifiers.push(`LIMIT ${count}`);
        } else {
            throw new Error(`Input for LIMIT must be number but is ${typeof count}.`);
        }
        return this;
    }

    /**
     * Set limit for offset
     *
     * @method offset
     * @param {Number} count - Offset count
     * @returns {Query} - Returns current instance (chainable)
     */
    offset(count) {
        if (typeof count === 'number') {
            this._config.solutionModifiers.push(`OFFSET ${count}`);
        } else {
            throw new Error(`Input for OFFSET must be number but is ${typeof count}.`);
        }
        return this;
    }

    /**
     * Execute query
     *
     * @method exec
     * @returns {Promise} - Returns a Promise with will yield a Result object
     */
    exec() {
        return this._transport.submit(this.toString());
    }

    /**
     * Retrieves the SPARQL string representation of the current instance, adding the FILTER keyword.
     *
     * @method toString
     * @param {Boolean} isSubquery - If set, skips the BASE and PREFIX parts for inclusion as a subquery
     * @returns {String}
     */
    toString(isSubQuery = false) {
        var queryString = '';

        if (!isSubQuery) {
            if (this._config.base) {
                queryString += `BASE ${this._config.base}`;
            }

            if (this._config.prefixes.length > 0) {
                for (let prefix of this._config.prefixes) {
                    queryString += `${prefix.toString()} `;
                }
            }
        }

        if (this._config.query) {
            queryString += this._config.query.toString();
        } else {
            throw new Error(`TypeError: Query type must be defined.`);
        }

        if (Array.isArray(this._config.datasetClause)) {
            queryString += `${this._config.datasetClause.join(' ')} `;
        } else {
            throw new Error(`TypeError: Dataset clause should be array but is ${typeof this._config.datasetClause}`);
        }

        if (this._config.whereClause) {
            queryString += `WHERE ${this._config.whereClause.toString()}`;
        } else {
            throw new Error(`TypeError: Where clause is not defined!`);
        }

        if (Array.isArray(this._config.solutionModifiers)) {
            for (let mod of this._config.solutionModifiers) {
                queryString += ` ${mod.toString()}`;
            }
        }

        return queryString;
    }

    /**
     * Reset query (endpoint setting stays)
     *
     * @method reset
     */
    reset() {
        this._config = {
            base: null,
            prefixes: [],
            query: null,
            subQueries: [],
            datasetClause: [],
            whereClause: null,
            solutionModifiers: []
        };
    }

    addArrayOrSingle(content, addFunction) {
        if (Array.isArray(content)) {
            for (var element of content) {
                addFunction(element);
            }
        } else {
            addFunction(content);
        }
    }
}