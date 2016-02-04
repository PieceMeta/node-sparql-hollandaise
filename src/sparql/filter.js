'use strict';

export default class Filter {
    constructor(content) {
        this.content = content;
    }

    toString() {
        return `FILTER (${this.content})`;
    }
}