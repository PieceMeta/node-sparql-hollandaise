let chai = require('chai');
chai.should();

import Filter from '../../src/sparql/filter';

describe('Filter', () => {
    let filter = new Filter('langMatches( lang(?label), "de" )');
    it('returns filter string', () => {
        filter.toString().should.equal('FILTER (langMatches( lang(?label), "de" ))');
    });
});