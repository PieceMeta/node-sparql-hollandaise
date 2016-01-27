'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SparqlFilter = function () {
    function SparqlFilter(content) {
        _classCallCheck(this, SparqlFilter);

        this.content = content;
    }

    _createClass(SparqlFilter, [{
        key: 'toString',
        value: function toString() {
            return 'FILTER (' + this.content + ')';
        }
    }]);

    return SparqlFilter;
}();

module.exports = SparqlFilter;