'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Triple = function () {
    /**
     * Represents a SPARQL triple (including object- and predicate-object-lists)
     *
     * @class Triple
     * @constructor
     * @param {String|Array} args - Either one (complete triple string) or three (separate subject, predicate, object) strings. Additionally, a string and an array can be supplied to create object- or predicate-object-lists.
     */
    function Triple() {
        _classCallCheck(this, Triple);

        var splitTriple = null;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        switch (args.length) {
            case 3:
                var valid = true;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var arg = _step.value;

                        valid = typeof arg === 'string';
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (valid) splitTriple = args;
                break;
            case 2:
                if (typeof args[0] === 'string' && Array.isArray(args[1])) {
                    var params = args[0].split(' ');
                    if (params.length === 2) {
                        // both subject and predicate were given
                        // we have an object list
                        splitTriple = [params[0], params[1], args[1]];
                    } else if (params.length === 1) {
                        // only subject was given
                        // this is an object-predicate list
                        splitTriple = [params[0], args[1], null];
                    }
                }
                break;
            case 1:
                if (typeof args[0] === 'string') {
                    splitTriple = args[0].split(' ');
                }
                break;
        }
        if (Array.isArray(splitTriple)) {
            this.subject = splitTriple[0];
            this.predicate = splitTriple[1];
            this.object = splitTriple[2];
        } else {
            throw new Error('Triple: Wrong argument count or malformed input');
        }
    }

    /**
     * Retrieves the SPARQL string representation of the current instance
     *
     * @method toString
     * @returns {String}
     */


    _createClass(Triple, [{
        key: 'toString',
        value: function toString() {
            if (Array.isArray(this.predicate)) {
                return this.subject + ' ' + this.predicate.join(' ; ');
            } else if (Array.isArray(this.object)) {
                return this.subject + ' ' + this.predicate + ' ' + this.object.join(' , ');
            }
            return this.subject + ' ' + this.predicate + ' ' + this.object;
        }
    }]);

    return Triple;
}();

exports.default = Triple;