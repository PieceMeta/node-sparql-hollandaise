'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SparqlTriple = require('./triple'),
    SparqlFilter = require('./filter');

var SparqlGraphPattern = function () {
    function SparqlGraphPattern(elements) {
        var optional = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        var alternative = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        var allowedTypes = arguments.length <= 3 || arguments[3] === undefined ? [SparqlTriple, SparqlFilter] : arguments[3];

        _classCallCheck(this, SparqlGraphPattern);

        this.clear();
        this._allowedTypes = allowedTypes;
        this._optional = optional;
        this._alternative = alternative;
        if (elements instanceof Array) {
            for (var i = 0; i < elements; i += 1) {
                this.addElement(elements[i]);
            }
        } else if (elements) {
            this.addElement(elements);
        }
    }

    _createClass(SparqlGraphPattern, [{
        key: 'addElement',
        value: function addElement(element) {
            var atIndex = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];

            if (typeof element === 'string') {
                element = new SparqlTriple(element);
            }
            if (this._allowedTypes.indexOf(element.constructor) > -1) {
                this._elements.splice(atIndex < 0 ? this.countElements() : atIndex, 0, element);
            } else {
                throw new Error('TypeError: Element of type ' + (element.constructor || (typeof element === 'undefined' ? 'undefined' : _typeof(element))) + ' is not allowed for this block.');
            }
        }
    }, {
        key: 'removeElements',
        value: function removeElements() {
            var atIndex = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var count = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            if (atIndex >= 0 && atIndex + count < this.countElements()) {
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
            var result = '' + (this._optional ? 'OPTIONAL ' : '') + (this._alternative ? 'UNION ' : '') + '{ ';
            for (var i = 0; i < this._elements.length; i += 1) {
                result += this._elements[i].toString() + ' ' + (this._elements[i] instanceof SparqlTriple ? '. ' : '');
            }
            result += ' } ';
            return result;
        }
    }]);

    return SparqlGraphPattern;
}();

module.exports = SparqlGraphPattern;