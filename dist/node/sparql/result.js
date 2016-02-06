'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Result =
/**
 * The Result class wraps the possible responses from the SPARQL endpoint's response
 *
 * @class Result
 * @constructor
 * @param {String} data - Result object
 */
function Result(data) {
    _classCallCheck(this, Result);

    if (data.hasOwnProperty('results') && data.hasOwnProperty('head')) {
        this.bindings = data.results.bindings;
        this.vars = data.head.vars;
        this.link = data.head.link;
    }
    if (data.hasOwnProperty('boolean')) {
        this.boolean = data.boolean;
    }
};

exports.default = Result;