'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _triple = require('./triple');

var _triple2 = _interopRequireDefault(_triple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GraphPattern = function () {
    /**
     * The GraphPattern represents a list of Triples, Filters and Queries
     *
     * @class GraphPattern
     * @constructor
     * @param {Object|Array} elements - Initial item(s) for the GraphPattern
     * @param {Boolean} optional - Set the OPTIONAL flag (for use within GroupGraphPatterns)
     * @param {Boolean} union - Set the UNION flag (for use within GroupGraphPatterns)
     * @param {Array} allowedTypes - Override the default allowed types (Triple, Filter and Query)
     */

    function GraphPattern(elements) {
        var optional = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        var union = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        var allowedTypes = arguments.length <= 3 || arguments[3] === undefined ? ['Triple', 'Filter', 'Query'] : arguments[3];

        _classCallCheck(this, GraphPattern);

        this.clear();
        this._allowedTypes = allowedTypes;
        this._optional = optional;
        this._union = union;
        if (Array.isArray(elements)) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var element = _step.value;

                    this.addElement(element);
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
        } else if (elements) {
            this.addElement(elements);
        }
    }

    /**
     * Adds an element to the pattern
     *
     * @method addElement
     * @param {Object|String} element - Single item to add
     * @param {number} atIndex - Optional index for the added element (default is end of list)
     */

    _createClass(GraphPattern, [{
        key: 'addElement',
        value: function addElement(element) {
            var atIndex = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];

            if (typeof element === 'string') {
                element = new _triple2.default(element);
            }
            if (this._allowedTypes.indexOf(element.constructor.name) > -1) {
                this._elements.splice(atIndex < 0 ? this.countElements() : atIndex, 0, element);
            } else {
                throw new Error('TypeError: Element of type ' + (element.constructor.name || (typeof element === 'undefined' ? 'undefined' : _typeof(element))) + ' is not allowed for this block.');
            }
        }

        /**
         * Removes one or more elements from the pattern
         *
         * @method removeElements
         * @param {number} atIndex - Index of item to remove (default is first)
         * @param {number} count - Number of elements to remove (default is 1)
         */

    }, {
        key: 'removeElements',
        value: function removeElements() {
            var atIndex = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var count = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            if (atIndex >= 0 && atIndex + count <= this.countElements()) {
                this._elements.splice(atIndex, count);
            } else {
                throw new Error('OutOfBounds: Cannot remove elements from block, index and/or count out of bounds.');
            }
        }

        /**
         * Retrieves the elements from the pattern
         *
         * @method getElements
         * @returns {Array}
         */

    }, {
        key: 'getElements',
        value: function getElements() {
            return this._elements;
        }

        /**
         * Get the element count
         *
         * @method countElements
         * @returns {Number}
         */

    }, {
        key: 'countElements',
        value: function countElements() {
            return this._elements.length;
        }

        /**
         * Clear the pattern
         *
         * @method clear
         */

    }, {
        key: 'clear',
        value: function clear() {
            this._elements = [];
        }

        /**
         * Retrieves the SPARQL string representation of the current instance
         *
         * @method toString
         * @returns {String}
         */

    }, {
        key: 'toString',
        value: function toString() {
            var result = '' + (this._optional ? 'OPTIONAL ' : '') + (this._union ? 'UNION ' : '') + '{ ';
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var element = _step2.value;

                    if (element.constructor.name === 'Query') {
                        result += '{ ' + element.toString(true) + ' } ';
                    } else {
                        result += '' + element.toString() + (this._elements.length > 1 && element instanceof _triple2.default ? ' . ' : ' ');
                    }
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

            result += '}';
            return result;
        }
    }]);

    return GraphPattern;
}();

exports.default = GraphPattern;