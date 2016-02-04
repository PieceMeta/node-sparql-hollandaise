'use strict';

let chai = require('chai');
chai.should();

import * as QueryTypes from '../../src/sparql/query-types';
import Triple from '../../src/sparql/triple'

describe('QueryTypes', () => {
    it('creates select query', () => {
        let select = new QueryTypes.Select('*');
        select.toString().should.equal('SELECT *');
    });
    it('creates select query with modifier', () => {
        let select = new QueryTypes.Select('*', 'DISTINCT');
        select.toString().should.equal('SELECT DISTINCT *');
    });
    it('creates describe query', () => {
        let describe = new QueryTypes.Describe('?x');
        describe.toString().should.equal('DESCRIBE ?x');
    });
    it('creates ask query', () => {
        let ask = new QueryTypes.Ask();
        ask.toString().should.equal('ASK');
    });
    it('creates construct query', () => {
        let triple = new Triple('?x foo:bar ?name'),
            construct = new QueryTypes.Construct(triple);
        construct.addTriple(triple);
        construct.toString().should.equal('DESCRIBE { ?x foo:bar ?name . ?x foo:bar ?name . }');
    });
});