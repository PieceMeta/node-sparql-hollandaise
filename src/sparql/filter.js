export default class Filter {
    /**
     * The Filter class represents a single FILTER clause to be used within GraphPatterns
     *
     * @class Filter
     * @constructor
     * @param {String} content - SPARQL Filter string (without the FILTER keyword)
     */
    constructor(content) {
        this.content = content;
    }

    /**
     * Retrieves the SPARQL string representation of the current instance, adding the FILTER keyword.
     *
     * @method toString
     * @returns {String}
     */
    toString() {
        return `FILTER (${this.content})`;
    }
}