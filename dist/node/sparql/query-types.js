'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Construct = exports.Ask = exports.Describe = exports.Select = undefined;

var _graphPattern = require('./graph-pattern');

var _graphPattern2 = _interopRequireDefault(_graphPattern);

var _triple = require('./triple');

var _triple2 = _interopRequireDefault(_triple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Select = exports.Select = function () {
    function Select(content, modifier) {
        _classCallCheck(this, Select);

        this._content = content;
        this._modifier = modifier;
    }

    _createClass(Select, [{
        key: 'toString',
        value: function toString() {
            return 'SELECT' + (this._modifier ? ' ' + this._modifier : '') + ' ' + this._content;
        }
    }]);

    return Select;
}();

var Describe = exports.Describe = function () {
    function Describe(content) {
        _classCallCheck(this, Describe);

        this._content = content;
    }

    _createClass(Describe, [{
        key: 'toString',
        value: function toString() {
            return 'DESCRIBE ' + this._content;
        }
    }]);

    return Describe;
}();

var Ask = exports.Ask = function () {
    function Ask() {
        _classCallCheck(this, Ask);
    }

    _createClass(Ask, [{
        key: 'toString',
        value: function toString() {
            return 'ASK';
        }
    }]);

    return Ask;
}();

var Construct = exports.Construct = function () {
    function Construct(triples) {
        _classCallCheck(this, Construct);

        this._constructTemplate = new _graphPattern2.default(triples, [_triple2.default]);
    }

    _createClass(Construct, [{
        key: 'addTriple',
        value: function addTriple(triple) {
            this._constructTemplate.addElement(triple);
        }
    }, {
        key: 'toString',
        value: function toString() {
            return 'DESCRIBE ' + this._constructTemplate.toString();
        }
    }]);

    return Construct;
}();