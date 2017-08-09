'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Construct = exports.Ask = exports.Describe = exports.Select = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _graphPattern = require('./graph-pattern');

var _graphPattern2 = _interopRequireDefault(_graphPattern);

var _triple = require('./triple');

var _triple2 = _interopRequireDefault(_triple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Select = exports.Select = function () {
    /**
     * Creates a SELECT query
     *
     * @class Select
     * @constructor
     * @param {String} content - String arguments for SELECT keyword
     * @param {String} modifier - Optional modifier (e.g. DISTINCT)
     */
    function Select(content, modifier) {
        _classCallCheck(this, Select);

        this._content = content;
        this._modifier = modifier;
    }

    /**
     * Retrieves the SPARQL string representation of the current instance
     *
     * @method toString
     * @returns {String}
     */


    _createClass(Select, [{
        key: 'toString',
        value: function toString() {
            return 'SELECT' + (this._modifier ? ' ' + this._modifier : '') + ' ' + this._content;
        }
    }]);

    return Select;
}();

var Describe = exports.Describe = function () {
    /**
     * Creates a DESCRIBE query
     *
     * @class Describe
     * @constructor
     * @param {String} content - String arguments for DESCRIBE keyword
     */
    function Describe(content) {
        _classCallCheck(this, Describe);

        this._content = content;
    }

    /**
     * Retrieves the SPARQL string representation of the current instance
     *
     * @method toString
     * @returns {String}
     */


    _createClass(Describe, [{
        key: 'toString',
        value: function toString() {
            return 'DESCRIBE ' + this._content;
        }
    }]);

    return Describe;
}();

var Ask = exports.Ask = function () {
    /**
     * Creates a ASK query
     *
     * @class Ask
     * @constructor
     */
    function Ask() {
        _classCallCheck(this, Ask);
    }

    /**
     * Retrieves the SPARQL string representation of the current instance
     *
     * @method toString
     * @returns {String}
     */


    _createClass(Ask, [{
        key: 'toString',
        value: function toString() {
            return 'ASK';
        }
    }]);

    return Ask;
}();

var Construct = exports.Construct = function () {
    /**
     * Creates a DESCRIBE query
     *
     * @class Construct
     * @constructor
     * @param {Triple|Array} triples - One or more Triple objects
     */
    function Construct(triples) {
        _classCallCheck(this, Construct);

        this._constructTemplate = new _graphPattern2.default(triples, false, false, ['Triple']);
    }

    /**
     * Add a Triple to the DESCRIBE query
     *
     * @method addTriple
     * @param {Triple} triple - A Triple object
     */


    _createClass(Construct, [{
        key: 'addTriple',
        value: function addTriple(triple) {
            this._constructTemplate.addElement(triple);
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
            return 'DESCRIBE ' + this._constructTemplate.toString();
        }
    }]);

    return Construct;
}();