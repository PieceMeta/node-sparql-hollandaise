'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _prefixIndex = require('./prefix-index');

var _prefixIndex2 = _interopRequireDefault(_prefixIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Prefix = function () {
    /**
     * Represents a single PREFIX component within a query
     *
     * @class Prefix
     * @constructor
     * @param {String} value - Either a full PREFIX string for a single prefix or a shortcode to be looked up in PrefixIndex
     * @param {Object} prefixIndex - Optional override for the default PrefixIndex
     */
    function Prefix(value) {
        var prefixIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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

    /**
     * Retrieves the SPARQL string representation of the current instance.
     *
     * @method toString
     * @returns {String}
     */


    _createClass(Prefix, [{
        key: 'toString',
        value: function toString() {
            return 'PREFIX ' + this.value;
        }
    }]);

    return Prefix;
}();

exports.default = Prefix;