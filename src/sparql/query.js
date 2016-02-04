'use strict';

import Transport from './transport';
import Prefix from './prefix';
import GraphPattern from './graph-pattern';
import GroupGraphPattern from './group-graph-pattern';
import * as QueryTypes from './query-types';

export default class Query {

    //
    //
    // setup query basics

    constructor(endpoint) {
        this.reset();
        this._transport = new Transport(endpoint);
    }

    //
    //
    // base iri

    base(content) {
        this._config.base = content;
    }

    //
    //
    // prefix

    prefix(content) {
        if (Array.isArray(content)) {
            for (var i = 0; i < content.length; i += 1) {
                this.addPrefix(content[i]);
            }
        } else {
            this.addPrefix(content);
        }
        return this;
    }

    addPrefix(content) {
        if (content instanceof Prefix) {
            this._config.prefixes.push(content);
        } else if (typeof content === 'string') {
            this._config.prefixes.push(new Prefix(content));
        }
    }

    getPrefixes() {
        return this._config.prefixes;
    }

    clearPrefixes() {
        this._config.prefixes = [];
    }

    //
    //
    // query types

    select(content, modifier) {
        this._config.query = new QueryTypes.Select(content, modifier);
        return this;
    }

    describe(content) {
        this._config.query = new QueryTypes.Describe(content);
        return this;
    }

    ask() {
        this._config.query = new QueryTypes.Ask();
        return this;
    }

    construct(triples) {
        this._config.query = new QueryTypes.Construct(triples);
        return this;
    }

    //
    //
    // dataset clause

    from(content, named = false) {
        if (Array.isArray(content)) {
            for (var i = 0; i < content.length; i += 1) {
                this._config.datasetClause.push(`FROM${named ? ' NAMED' : ''} ${content[i]}`);
            }
        } else {
            this._config.datasetClause.push(`FROM${named ? ' NAMED' : ''} ${content[i]}`);
        }
        return this;
    }

    getDatasetClauses() {
        return this._config.datasetClause;
    }

    clearDatasetClauses() {
        this._config.datasetClause = [];
    }

    //
    //
    // where clause

    where(content) {
        if (Array.isArray(content)) {
            for (var i = 0; i < content.length; i += 1) {
                this.addToWhereClause(content[i]);
            }
        } else if (content instanceof GraphPattern ||
            content instanceof GroupGraphPattern) {
            this.setWhereClause(content);
        } else {
            this.addToWhereClause(content);
        }
        return this;
    }

    setWhereClause(graphPattern) {
        if (graphPattern instanceof GraphPattern ||
            graphPattern instanceof GroupGraphPattern) {
            this._config.whereClause = graphPattern;
        } else {
            throw new Error('TypeError: Where clause must be a graph pattern.');
        }
    }

    addToWhereClause(content, atIndex = -1) {
        if (this._config.whereClause === null) {
            this._config.whereClause = new GraphPattern(content);
        } else {
            this._config.whereClause.addElement(content, atIndex);
        }
    }

    removeFromWhereClause(atIndex = 0, count = 1) {
        this._config.whereClause.removeElements(atIndex, count);
    }

    clearWhereClause() {
        this._config.whereClause.clear();
    }

    getWhereClause() {
        return this._config.whereClause.getElements();
    }

    getWhereClauseCount() {
        return this._config.whereClause.countElements();
    }

    //
    //
    // solution modifiers

    order(content) {
        if (typeof content === 'string') {
            this._config.solutionModifiers.push(`ORDER BY ${content}`);
        } else {
            throw new Error(`Input for ORDER must be string but is ${typeof content}.`);
        }
        return this;
    }

    limit(count) {
        if (typeof count === 'number') {
            this._config.solutionModifiers.push(`LIMIT ${count}`);
        } else {
            throw new Error(`Input for LIMIT must be number but is ${typeof count}.`);
        }
        return this;
    }

    offset(count) {
        if (typeof count === 'number') {
            this._config.solutionModifiers.push(`OFFSET ${count}`);
        } else {
            throw new Error(`Input for OFFSET must be number but is ${typeof count}.`);
        }
        return this;
    }

    //
    //
    // subqueries

    addToSubQueries(query, atIndex = -1) {
        if (query instanceof Query) {
            this._config.subQueries.splice(atIndex < 0 ? this._config.subQueries.length : atIndex, 0, query);
        }
    }

    removeFromSubQueries(atIndex = 0, count = 1) {
        this._config.subQueries.splice(atIndex, count);
    }

    clearSubQueries() {
        this._config.subQueries = [];
    }

    //
    //
    // execute query

    exec() {
        return this._transport.submit(this.toString());
    }

    //
    //
    // util

    toString(isSubQuery = false) {
        var queryString = '';

        if (!isSubQuery) {
            if (this._config.base) {
                queryString += `BASE ${this._config.base}`;
            }

            if (this._config.prefixes.length > 0) {
                for (let i = 0; i < this._config.prefixes.length; i += 1) {
                    queryString += `${this._config.prefixes[i].toString()} `;
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
            for (let i = 0; i < this._config.solutionModifiers.length; i += 1) {
                queryString += ` ${this._config.solutionModifiers[i].toString()}`;
            }
        }

        return queryString;
    }

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
}