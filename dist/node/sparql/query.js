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
    /**
     * The Query is the root object for all SPARQL requests
     *
     * @class Query
     * @constructor
     * @param {String} endpoint - URL of the SPARQL endpoint
     */

    function Query(endpoint) {
        _classCallCheck(this, Query);

        this.reset();
        this._transport = new _transport2.default(endpoint);
    }

    /**
     * Sets the base IRI
     *
     * @method base
     * @param {String} content - BASE string
     */

    _createClass(Query, [{
        key: 'base',
        value: function base(content) {
            this._config.base = content;
        }

        /**
         * Sets the prefix(es) for the query
         *
         * @method prefix
         * @param {Prefix|String|Array} content - A single Prefix string or object or an array of Prefix objects or strings
         * @returns {Query} - Returns current instance (chainable)
         */

    }, {
        key: 'prefix',
        value: function prefix(content) {
            this.addArrayOrSingle(content, this.addPrefix);
            return this;
        }

        /**
         * Add a prefix to the query
         *
         * @method addPrefix
         * @param {Prefix|String|Array} content - A single Prefix string or object
         */

    }, {
        key: 'addPrefix',
        value: function addPrefix(content) {
            if (content instanceof _prefix2.default) {
                this._config.prefixes.push(content);
            } else if (typeof content === 'string') {
                this._config.prefixes.push(new _prefix2.default(content));
            }
        }

        /**
         * Get the Prefix objects of the Query
         *
         * @method getPrefixes
         * @returns {Array}
         */

    }, {
        key: 'getPrefixes',
        value: function getPrefixes() {
            return this._config.prefixes;
        }

        /**
         * Remove all Prefixes from the Query
         *
         * @method clearPrefixes
         */

    }, {
        key: 'clearPrefixes',
        value: function clearPrefixes() {
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

    }, {
        key: 'select',
        value: function select(content, modifier) {
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

    }, {
        key: 'describe',
        value: function describe(content) {
            this._config.query = new QueryTypes.Describe(content);
            return this;
        }

        /**
         * Set the current query to ASK
         *
         * @method ask
         * @returns {Query} - Returns current instance (chainable)
         */

    }, {
        key: 'ask',
        value: function ask() {
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

    }, {
        key: 'construct',
        value: function construct(triples) {
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

    }, {
        key: 'from',
        value: function from(content) {
            var _this = this;

            var named = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            this.addArrayOrSingle(content, function (element) {
                _this._config.datasetClause.push('FROM' + (named ? ' NAMED' : '') + ' ' + element);
            });
            return this;
        }

        /**
         * Get current dataset clauses
         *
         * @method getDatasetClauses
         * @returns {Array}
         */

    }, {
        key: 'getDatasetClauses',
        value: function getDatasetClauses() {
            return this._config.datasetClause;
        }

        /**
         * Clear current dataset clauses
         *
         * @method clearDatasetClauses
         */

    }, {
        key: 'clearDatasetClauses',
        value: function clearDatasetClauses() {
            this._config.datasetClause = [];
        }

        /**
         * Set where clause
         *
         * @method where
         * @param {String|Array} content - A GraphPattern or a GroupGraphPattern object
         * @returns {Query} - Returns current instance (chainable)
         */

    }, {
        key: 'where',
        value: function where(content) {
            if (content instanceof _graphPattern2.default || content instanceof _groupGraphPattern2.default) {
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

    }, {
        key: 'getWhereClause',
        value: function getWhereClause() {
            return this._config.whereClause;
        }

        /**
         * Set order for query
         *
         * @method order
         * @param {String} content - Order string without ORDER BY
         * @returns {Query} - Returns current instance (chainable)
         */

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

        /**
         * Set limit for query
         *
         * @method limit
         * @param {Number} count - Limit count
         * @returns {Query} - Returns current instance (chainable)
         */

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

        /**
         * Set limit for offset
         *
         * @method offset
         * @param {Number} count - Offset count
         * @returns {Query} - Returns current instance (chainable)
         */

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

        /**
         * Execute query
         *
         * @method exec
         * @returns {Promise} - Returns a Promise with will yield a Result object
         */

    }, {
        key: 'exec',
        value: function exec() {
            return this._transport.submit(this.toString());
        }

        /**
         * Retrieves the SPARQL string representation of the current instance, adding the FILTER keyword.
         *
         * @method toString
         * @param {Boolean} isSubquery - If set, skips the BASE and PREFIX parts for inclusion as a subquery
         * @returns {String}
         */

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
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this._config.prefixes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var prefix = _step.value;

                            queryString += prefix.toString() + ' ';
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
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
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this._config.solutionModifiers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var mod = _step2.value;

                        queryString += ' ' + mod.toString();
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }

            return queryString;
        }

        /**
         * Reset query (endpoint setting stays)
         *
         * @method reset
         */

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
    }, {
        key: 'addArrayOrSingle',
        value: function addArrayOrSingle(content, addFunction) {
            if (Array.isArray(content)) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = content[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var element = _step3.value;

                        addFunction(element);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            } else {
                addFunction(content);
            }
        }
    }]);

    return Query;
}();

exports.default = Query;