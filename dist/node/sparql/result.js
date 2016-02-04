'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Result = function Result(data) {
    _classCallCheck(this, Result);

    if (data.results) {
        this.bindings = data.results.bindings;
        this.vars = data.head.vars;
        this.link = data.head.link;
    }
    if (data.boolean) {
        this.boolean = data.boolean;
    }
};

exports.default = Result;