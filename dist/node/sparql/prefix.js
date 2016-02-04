'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _prefixIndex = require('./prefix-index');

var _prefixIndex2 = _interopRequireDefault(_prefixIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Prefix = function () {
    function Prefix(value) {
        var prefixIndex = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, Prefix);

        if (prefixIndex === null) {
            prefixIndex = _prefixIndex2.default;
        }
        if (value.indexOf(':') === -1) {
            if (prefixIndex.hasOwnProperty(value)) {
                this.value = value + ': <' + prefixIndex[value] + '>';
            } else {
                throw Error('No prefix found in PrefixIndex matching: ' + value);
            }
        } else {
            this.value = value.replace(/^PREFIX /, '');
        }
    }

    _createClass(Prefix, [{
        key: 'toString',
        value: function toString() {
            return 'PREFIX ' + this.value;
        }
    }]);

    return Prefix;
}();

exports.default = Prefix;