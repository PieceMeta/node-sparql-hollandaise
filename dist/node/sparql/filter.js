'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filter = function () {
    /**
     * The Filter class represents a single FILTER clause to be used within GraphPatterns
     *
     * @class Filter
     * @constructor
     * @param {String} content - SPARQL Filter string (without the FILTER keyword)
     */

    function Filter(content) {
        _classCallCheck(this, Filter);

        this.content = content;
    }

    /**
     * Retrieves the SPARQL string representation of the current instance, adding the FILTER keyword.
     *
     * @method toString
     * @returns {String}
     */

    _createClass(Filter, [{
        key: 'toString',
        value: function toString() {
            return 'FILTER (' + this.content + ')';
        }
    }]);

    return Filter;
}();

exports.default = Filter;