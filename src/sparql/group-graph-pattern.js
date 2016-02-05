'use strict';

import GraphPattern from './graph-pattern';

export default class GroupGraphPattern extends GraphPattern {
    /**
     * The GroupGraphPattern combines multiple GraphPatterns
     *
     * @class GroupGraphPattern
     * @extends GraphPattern
     * @constructor
     * @param {GraphPattern|Array} elements - Initial GraphPattern items for the GroupGraphPattern
     */
    constructor(elements) {
        super(elements, false, false, ['GraphPattern']);
    }
}