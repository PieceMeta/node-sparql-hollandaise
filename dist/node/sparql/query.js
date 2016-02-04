'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _transport = require('./transport');

var _transport2 = _interopRequireDefault(_transport);

var _prefix = require('./prefix');

var _prefix2 = _interopRequireDefault(_prefix);

var _graphPattern = require('./graph-pattern');

var _graphPattern2 = _interopRequireDefault(_graphPattern);

var _groupGraphPattern = require('./group-graph-pattern');

var _groupGraphPattern2 = _interopRequireDefault(_groupGraphPattern);

var _queryTypes = require('./query-types');

var QueryTypes = _interopRequireWildcard(_queryTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Query = function () {

    //
    //
    // setup query basics

    function Query(endpoint) {
        _classCallCheck(this, Query);

        this.reset();
        this._transport = new _transport2.default(endpoint);
    }

    //
    //
    // base iri

    _createClass(Query, [{
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
            if (content instanceof _prefix2.default) {
                this._config.prefixes.push(content);
            } else if (typeof content === 'string') {
                this._config.prefixes.push(new _prefix2.default(content));
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
            this._config.query = new QueryTypes.Select(content, modifier);
            return this;
        }
    }, {
        key: 'describe',
        value: function describe(content) {
            this._config.query = new QueryTypes.Describe(content);
            return this;
        }
    }, {
        key: 'ask',
        value: function ask() {
            this._config.query = new QueryTypes.Ask();
            return this;
        }
    }, {
        key: 'construct',
        value: function construct(triples) {
            this._config.query = new QueryTypes.Construct(triples);
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
            } else if (content instanceof _graphPattern2.default || content instanceof _groupGraphPattern2.default) {
                this.setWhereClause(content);
            } else {
                this.addToWhereClause(content);
            }
            return this;
        }
    }, {
        key: 'setWhereClause',
        value: function setWhereClause(graphPattern) {
            if (graphPattern instanceof _graphPattern2.default || graphPattern instanceof _groupGraphPattern2.default) {
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
                this._config.whereClause = new _graphPattern2.default(content);
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
        // subqueries

    }, {
        key: 'addToSubQueries',
        value: function addToSubQueries(query) {
            var atIndex = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];

            if (query instanceof Query) {
                this._config.subQueries.splice(atIndex < 0 ? this._config.subQueries.length : atIndex, 0, query);
            }
        }
    }, {
        key: 'removeFromSubQueries',
        value: function removeFromSubQueries() {
            var atIndex = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var count = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            this._config.subQueries.splice(atIndex, count);
        }
    }, {
        key: 'clearSubQueries',
        value: function clearSubQueries() {
            this._config.subQueries = [];
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
            var isSubQuery = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            var queryString = '';

            if (!isSubQuery) {
                if (this._config.base) {
                    queryString += 'BASE ' + this._config.base;
                }

                if (this._config.prefixes.length > 0) {
                    for (var i = 0; i < this._config.prefixes.length; i += 1) {
                        queryString += this._config.prefixes[i].toString() + ' ';
                    }
                }
            }

            if (this._config.query) {
                queryString += this._config.query.toString();
            } else {
                throw new Error('TypeError: Query type must be defined.');
            }

            if (Array.isArray(this._config.datasetClause)) {
                queryString += this._config.datasetClause.join(' ') + ' ';
            } else {
                throw new Error('TypeError: Dataset clause should be array but is ' + _typeof(this._config.datasetClause));
            }

            if (this._config.whereClause) {
                queryString += 'WHERE ' + this._config.whereClause.toString();
            } else {
                throw new Error('TypeError: Where clause is not defined!');
            }

            if (Array.isArray(this._config.solutionModifiers)) {
                for (var i = 0; i < this._config.solutionModifiers.length; i += 1) {
                    queryString += ' ' + this._config.solutionModifiers[i].toString();
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
                subQueries: [],
                datasetClause: [],
                whereClause: null,
                solutionModifiers: []
            };
        }
    }]);

    return Query;
}();

exports.default = Query;