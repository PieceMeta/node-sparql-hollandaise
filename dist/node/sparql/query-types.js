'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SparqlBlock = require('./graph-pattern'),
    SparqlTriple = require('./triple');

var SparqlQuerySelect = function () {
    function SparqlQuerySelect(content, modifier) {
        _classCallCheck(this, SparqlQuerySelect);

        this._content = content;
        this._modifier = modifier;
    }

    _createClass(SparqlQuerySelect, [{
        key: 'toString',
        value: function toString() {
            return 'SELECT' + (this._modifier ? ' ' + this._modifier : '') + ' ' + this._content;
        }
    }]);

    return SparqlQuerySelect;
}();

var SparqlQueryDescribe = function () {
    function SparqlQueryDescribe(content) {
        _classCallCheck(this, SparqlQueryDescribe);

        this._content = content;
    }

    _createClass(SparqlQueryDescribe, [{
        key: 'toString',
        value: function toString() {
            return 'DESCRIBE ' + this._content;
        }
    }]);

    return SparqlQueryDescribe;
}();

var SparqlQueryAsk = function () {
    function SparqlQueryAsk() {
        _classCallCheck(this, SparqlQueryAsk);
    }

    _createClass(SparqlQueryAsk, [{
        key: 'toString',
        value: function toString() {
            return 'ASK';
        }
    }]);

    return SparqlQueryAsk;
}();

var SparqlQueryConstruct = function () {
    function SparqlQueryConstruct(triples) {
        _classCallCheck(this, SparqlQueryConstruct);

        this._constructTemplate = new SparqlBlock(triples, [SparqlTriple]);
    }

    _createClass(SparqlQueryConstruct, [{
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

    return SparqlQueryConstruct;
}();

module.exports = {
    SparqlQuerySelect: SparqlQuerySelect,
    SparqlQueryDescribe: SparqlQueryDescribe,
    SparqlQueryAsk: SparqlQueryAsk,
    SparqlQueryConstruct: SparqlQueryConstruct
};