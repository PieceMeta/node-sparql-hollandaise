'use strict';

import GraphPattern from './graph-pattern';

export default class GroupGraphPattern extends GraphPattern {
    constructor(elements) {
        super(elements, false, false, ['GraphPattern']);
    }
}