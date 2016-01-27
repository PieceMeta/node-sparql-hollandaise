'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SparqlGraphPattern = require('./graph-pattern');

var SparqlGroupGraphPattern = function (_SparqlGraphPattern) {
    _inherits(SparqlGroupGraphPattern, _SparqlGraphPattern);

    function SparqlGroupGraphPattern(elements) {
        _classCallCheck(this, SparqlGroupGraphPattern);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SparqlGroupGraphPattern).call(this, elements, false, false, [SparqlGraphPattern]));
    }

    return SparqlGroupGraphPattern;
}(SparqlGraphPattern);

module.exports = SparqlGroupGraphPattern;