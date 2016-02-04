'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Triple = function () {
    function Triple() {
        _classCallCheck(this, Triple);

        var splitTriple = [null, null, null];

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (args.length === 3) {
            splitTriple = args;
        } else if (args.length === 1 && typeof args[0] === 'string') {
            splitTriple = args[0].split(' ');
        }
        this.subject = splitTriple[0];
        this.predicate = splitTriple[1];
        this.object = splitTriple[2];
    }

    _createClass(Triple, [{
        key: 'toString',
        value: function toString() {
            return this.subject + ' ' + this.predicate + ' ' + this.object;
        }
    }]);

    return Triple;
}();

exports.default = Triple;