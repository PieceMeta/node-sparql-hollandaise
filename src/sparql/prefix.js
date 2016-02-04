'use strict';

import PrefixIndex from './prefix-index';

export default class Prefix {
    constructor(value, prefixIndex = null) {
        if (prefixIndex === null) {
            prefixIndex = PrefixIndex;
        }
        if (value.indexOf(':') === -1) {
            if (prefixIndex.hasOwnProperty(value)) {
                this.value = `${value}: <${prefixIndex[value]}>`;
            } else {
                throw Error(`No prefix found in PrefixIndex matching: ${value}`);
            }
        } else {
            this.value = value.replace(/^PREFIX /, '');
        }
    }

    toString() {
        return `PREFIX ${this.value}`;
    }
}