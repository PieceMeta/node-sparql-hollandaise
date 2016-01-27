'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SparqlResult = function SparqlResult(data) {
    _classCallCheck(this, SparqlResult);

    if (data.results) {
        this.bindings = data.results.bindings;
        this.vars = data.head.vars;
        this.link = data.head.link;
    }
    if (data.boolean) {
        this.boolean = data.boolean;
    }
};

module.exports = SparqlResult;