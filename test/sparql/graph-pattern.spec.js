'use strict';

let chai = require('chai');
chai.should();

import GraphPattern from '../../src/sparql/graph-pattern';
import Triple from '../../src/sparql/triple';
import Filter from '../../src/sparql/filter';
import Query from '../../src/sparql/query';

describe('GraphPattern', () => {
    let triple = new Triple('?x foaf:mbox ?mbox'),
        filter = new Filter('langMatches( lang(?label), "de" )'),
        pattern;
    it('creates pattern from array', () => {
        pattern = new GraphPattern([triple, filter]);
        pattern.toString().should.equal('{ ?x foaf:mbox ?mbox . FILTER (langMatches( lang(?label), "de" )) }');
    });
    it('returns element count', () => {
        pattern.countElements().should.equal(2);
    });
    it('clears elements', () => {
        pattern.clear();
        pattern.countElements().should.equal(0);
    });
    it('creates pattern from single value', () => {
        pattern = new GraphPattern(triple);
        pattern.toString().should.equal('{ ?x foaf:mbox ?mbox }');
    });
    it('adds element at end', () => {
        pattern.addElement(filter);
        pattern.toString().should.equal('{ ?x foaf:mbox ?mbox . FILTER (langMatches( lang(?label), "de" )) }');
    });
    it('inserts element at index 0', () => {
        pattern.addElement(triple, 0);
        pattern.toString().should.equal('{ ?x foaf:mbox ?mbox . ?x foaf:mbox ?mbox . FILTER (langMatches( lang(?label), "de" )) }');
    });
    it('removes 2 elements at index 1', () => {
        pattern.removeElements(1, 2);
        pattern.toString().should.equal('{ ?x foaf:mbox ?mbox }');
    });
    it('removes 1 element at beginning', () => {
        pattern.removeElements();
        pattern.countElements().should.equal(0);
    });
    it('adds graph pattern with subquery', () => {
        let query = new Query(null)
            .select('*')
            .where(new GraphPattern(triple));
        pattern.addElement(triple);
        pattern.addElement(query);
        pattern.addElement(filter);
        pattern.toString().should.equal('{ ?x foaf:mbox ?mbox . { SELECT * WHERE { ?x foaf:mbox ?mbox } } FILTER (langMatches( lang(?label), "de" )) }');
    });
});