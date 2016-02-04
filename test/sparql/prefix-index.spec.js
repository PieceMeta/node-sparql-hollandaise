'use strict';

let chai = require('chai');
chai.should();

import PrefixIndex from '../../src/sparql/prefix-index';

describe('PrefixIndex', () => {
    it('returns value for prefix shortcode', () => {
        PrefixIndex['dct'].should.equal('http://purl.org/dc/terms/');
    });
});