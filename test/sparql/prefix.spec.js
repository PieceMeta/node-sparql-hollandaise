let chai = require('chai');
chai.should();

import Prefix from '../../src/sparql/prefix';

describe('Prefix', () => {
    it('creates prefix from prefix-index shortcode', () => {
        let prefix = new Prefix('dct');
        prefix.toString().should.equal('PREFIX dct: <http://purl.org/dc/terms/>');
    });
    it('creates prefix from string', () => {
        let prefix = new Prefix('dct: <http://purl.org/dc/terms/>');
        prefix.toString().should.equal('PREFIX dct: <http://purl.org/dc/terms/>');
    });
    it('strips PREFIX from input string', () => {
        let prefix = new Prefix('PREFIX dct: <http://purl.org/dc/terms/>');
        prefix.toString().should.equal('PREFIX dct: <http://purl.org/dc/terms/>');
    });
});