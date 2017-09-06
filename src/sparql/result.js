export default class Result {
    /**
     * The Result class wraps the possible responses from the SPARQL endpoint's response
     *
     * @class Result
     * @constructor
     * @param {String} data - Result object
     */
    constructor(data) {
        if (data.hasOwnProperty('results') && data.hasOwnProperty('head')) {
            this.bindings = data.results.bindings;
            this.vars = data.head.vars;
            this.link = data.head.link;
        }
        if (data.hasOwnProperty('boolean')) {
            this.boolean = data.boolean;
        }
    }
}