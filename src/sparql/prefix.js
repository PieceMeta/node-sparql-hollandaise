'use strict';

export default class Prefix {
    constructor(value) {
        this.value = value.replace(/^PREFIX /, '');
    }

    toString() {
        return `PREFIX ${this.value}`;
    }
}