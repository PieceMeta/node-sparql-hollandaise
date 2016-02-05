'use strict';

export default class Triple {
    constructor(...args) {
        var splitTriple = null;
        switch (args.length) {
            case 3:
                let valid = true;
                for (let arg of args) {
                    valid = typeof arg === 'string';
                }
                if (valid) splitTriple = args;
                break;
            case 2:
                if (typeof args[0] === 'string' && Array.isArray(args[1])) {
                    let params = args[0].split(' ');
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

    toString() {
        if (Array.isArray(this.predicate)) {
            return `${this.subject} ${this.predicate.join(' ; ')}`;
        } else if (Array.isArray(this.object)) {
            return `${this.subject} ${this.predicate} ${this.object.join(' , ')}`;
        }
        return `${this.subject} ${this.predicate} ${this.object}`;
    }
}