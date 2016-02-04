'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SparqlTransport = require('./transport'),
    SparqlPrefix = require('./prefix'),
    SparqlGraphPattern = require('./graph-pattern'),
    SparqlGroupGraphPattern = require('./group-graph-pattern'),
    SparqlQueryTypes = require('./query-types');

var SparqlQuery = function () {

    //
    //
    // setup query basics

    function SparqlQuery(endpoint) {
        _classCallCheck(this, SparqlQuery);

        this.reset();
        this._transport = new SparqlTransport(endpoint);
    }

    //
    //
    // base iri

    _createClass(SparqlQuery, [{
        key: 'base',
        value: function base(content) {
            this._config.base = content;
        }

        //
        //
        // prefix

    }, {
        key: 'prefix',
        value: function prefix(content) {
            if (Array.isArray(content)) {
                for (var i = 0; i < content.length; i += 1) {
                    this.addPrefix(content[i]);
                }
            } else {
                this.addPrefix(content);
            }
            return this;
        }
    }, {
        key: 'addPrefix',
        value: function addPrefix(content) {
            if (content instanceof SparqlPrefix) {
                this._config.prefixes.push(content);
            } else if (typeof content === 'string') {
                this._config.prefixes.push(new SparqlPrefix(content));
            }
        }
    }, {
        key: 'getPrefixes',
        value: function getPrefixes() {
            return this._config.prefixes;
        }
    }, {
        key: 'clearPrefixes',
        value: function clearPrefixes() {
            this._config.prefixes = [];
        }

        //
        //
        // query types

    }, {
        key: 'select',
        value: function select(content, modifier) {
            this._config.query = new SparqlQueryTypes.SparqlQuerySelect(content, modifier);
            return this;
        }
    }, {
        key: 'describe',
        value: function describe(content) {
            this._config.query = new SparqlQueryTypes.SparqlQueryDescribe(content);
            return this;
        }
    }, {
        key: 'ask',
        value: function ask() {
            this._config.query = new SparqlQueryTypes.SparqlQueryAsk();
            return this;
        }
    }, {
        key: 'construct',
        value: function construct(triples) {
            this._config.query = new SparqlQueryTypes.SparqlQueryConstruct(triples);
            return this;
        }

        //
        //
        // dataset clause

    }, {
        key: 'from',
        value: function from(content) {
            var named = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            if (Array.isArray(content)) {
                for (var i = 0; i < content.length; i += 1) {
                    this._config.datasetClause.push('FROM' + (named ? ' NAMED' : '') + ' ' + content[i]);
                }
            } else {
                this._config.datasetClause.push('FROM' + (named ? ' NAMED' : '') + ' ' + content[i]);
            }
            return this;
        }
    }, {
        key: 'getDatasetClauses',
        value: function getDatasetClauses() {
            return this._config.datasetClause;
        }
    }, {
        key: 'clearDatasetClauses',
        value: function clearDatasetClauses() {
            this._config.datasetClause = [];
        }

        //
        //
        // where clause

    }, {
        key: 'where',
        value: function where(content) {
            if (Array.isArray(content)) {
                for (var i = 0; i < content.length; i += 1) {
                    this.addToWhereClause(content[i]);
                }
            } else if (content instanceof SparqlGraphPattern || content instanceof SparqlGroupGraphPattern) {
                this.setWhereClause(content);
            } else {
                this.addToWhereClause(content);
            }
            return this;
        }
    }, {
        key: 'setWhereClause',
        value: function setWhereClause(graphPattern) {
            if (graphPattern instanceof SparqlGraphPattern || graphPattern instanceof SparqlGroupGraphPattern) {
                this._config.whereClause = graphPattern;
            } else {
                throw new Error('TypeError: Where clause must be a graph pattern.');
            }
        }
    }, {
        key: 'addToWhereClause',
        value: function addToWhereClause(content) {
            var atIndex = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];

            if (this._config.whereClause === null) {
                this._config.whereClause = new SparqlGraphPattern(content);
            } else {
                this._config.whereClause.addElement(content, atIndex);
            }
        }
    }, {
        key: 'removeFromWhereClause',
        value: function removeFromWhereClause() {
            var atIndex = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var count = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            this._config.whereClause.removeElements(atIndex, count);
        }
    }, {
        key: 'clearWhereClause',
        value: function clearWhereClause() {
            this._config.whereClause.clear();
        }
    }, {
        key: 'getWhereClause',
        value: function getWhereClause() {
            return this._config.whereClause.getElements();
        }
    }, {
        key: 'getWhereClauseCount',
        value: function getWhereClauseCount() {
            return this._config.whereClause.countElements();
        }

        //
        //
        // solution modifiers

    }, {
        key: 'order',
        value: function order(content) {
            if (typeof content === 'string') {
                this._config.solutionModifiers.push('ORDER BY ' + content);
            } else {
                throw new Error('Input for ORDER must be string but is ' + (typeof content === 'undefined' ? 'undefined' : _typeof(content)) + '.');
            }
            return this;
        }
    }, {
        key: 'limit',
        value: function limit(count) {
            if (typeof count === 'number') {
                this._config.solutionModifiers.push('LIMIT ' + count);
            } else {
                throw new Error('Input for LIMIT must be number but is ' + (typeof count === 'undefined' ? 'undefined' : _typeof(count)) + '.');
            }
            return this;
        }
    }, {
        key: 'offset',
        value: function offset(count) {
            if (typeof count === 'number') {
                this._config.solutionModifiers.push('OFFSET ' + count);
            } else {
                throw new Error('Input for OFFSET must be number but is ' + (typeof count === 'undefined' ? 'undefined' : _typeof(count)) + '.');
            }
            return this;
        }

        //
        //
        // execute query

    }, {
        key: 'exec',
        value: function exec() {
            return this._transport.submit(this.toString());
        }

        //
        //
        // util

    }, {
        key: 'toString',
        value: function toString() {
            var queryString = '';

            if (this._config.base) {
                queryString += 'BASE ' + this._config.base;
            }

            if (this._config.prefixes.length > 0) {
                for (var i = 0; i < this._config.prefixes.length; i += 1) {
                    queryString += this._config.prefixes[i].toString() + ' ';
                }
            }

            if (this._config.query) {
                queryString += this._config.query.toString();
            } else {
                throw new Error('TypeError: Query type must be defined.');
            }

            if (this._config.datasetClause instanceof Array) {
                queryString += this._config.datasetClause.join(' ') + ' ';
            } else {
                throw new Error('TypeError: Dataset clause should be array but is ' + _typeof(this._config.datasetClause));
            }

            if (this._config.whereClause) {
                queryString += 'WHERE ' + this._config.whereClause.toString();
            } else {
                throw new Error('TypeError: Where clause is not defined!');
            }

            if (this._config.solutionModifiers instanceof Array) {
                for (var i = 0; i < this._config.solutionModifiers.length; i += 1) {
                    queryString += this._config.solutionModifiers[i].toString() + ' ';
                }
            }

            return queryString;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this._config = {
                base: null,
                prefixes: [],
                query: null,
                datasetClause: [],
                whereClause: null,
                solutionModifiers: []
            };
        }
    }]);

    return SparqlQuery;
}();

module.exports = SparqlQuery;