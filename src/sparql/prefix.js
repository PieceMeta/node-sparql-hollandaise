'use strict';

import PrefixIndex from './prefix-index';

export default class Prefix {
    /**
     * Represents a single PREFIX component within a query
     *
     * @class Prefix
     * @constructor
     * @param {String} value - Either a full PREFIX string for a single prefix or a shortcode to be looked up in PrefixIndex
     * @param {Object} prefixIndex - Optional override for the default PrefixIndex
     */
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

    /**
     * Retrieves the SPARQL string representation of the current instance.
     *
     * @method toString
     * @returns {String}
     */
    toString() {
        return `PREFIX ${this.value}`;
    }
}