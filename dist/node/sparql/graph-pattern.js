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
            for (var i = 0; i < elements.length; i += 1) {
                this.addElement(elements[i]);
            }
        } else if (elements) {
            this.addElement(elements);
        }
    }

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
    }, {
        key: 'getElements',
        value: function getElements() {
            return this._elements;
        }
    }, {
        key: 'countElements',
        value: function countElements() {
            return this._elements.length;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this._elements = [];
        }
    }, {
        key: 'toString',
        value: function toString() {
            var result = '' + (this._optional ? 'OPTIONAL ' : '') + (this._union ? 'UNION ' : '') + '{ ';
            for (var i = 0; i < this._elements.length; i += 1) {
                if (this._elements[i].constructor.name === 'Query') {
                    result += '{ ' + this._elements[i].toString(true) + ' } ';
                } else {
                    result += '' + this._elements[i].toString() + (this._elements.length > 1 && this._elements[i] instanceof _triple2.default ? ' . ' : ' ');
                }
            }
            result += '}';
            return result;
        }
    }]);

    return GraphPattern;
}();

exports.default = GraphPattern;