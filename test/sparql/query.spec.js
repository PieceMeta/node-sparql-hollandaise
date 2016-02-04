'use strict';

let chai = require('chai');
chai.should();

import Query from '../../src/sparql/query';
import Triple from '../../src/sparql/triple';
import GraphPattern from '../../src/sparql/graph-pattern';

describe('Query', () => {
    let query;
    it('creates query with endpoint', () => {
        query = new Query('http://localhost');
        query.should.be.instanceOf(Query);
    });
    it('sets select query type', () => {
        query.select('*');
    });
    it('creates where clause from array', () => {
        let triple = new Triple('?x foaf:mbox ?mbox'),
            pattern = new GraphPattern([triple, triple]);
        query.where(pattern);
        query.toString().should.equal('SELECT * WHERE { ?x foaf:mbox ?mbox . ?x foaf:mbox ?mbox . }');
    });
    it('adds element to where clause', () => {
        let triple = new Triple('?y foo:bar ?name');
        query.addToWhereClause(triple);
        query.toString().should.equal('SELECT * WHERE { ?x foaf:mbox ?mbox . ?x foaf:mbox ?mbox . ?y foo:bar ?name . }');
    });
    it('removes 2 elements from where clause at index 1', () => {
        query.removeFromWhereClause(1, 2);
        query.toString().should.equal('SELECT * WHERE { ?x foaf:mbox ?mbox }');
    });
    it('removes one element from where clause at beginning', () => {
        query.removeFromWhereClause();
        query.toString().should.equal('SELECT * WHERE { }');
    });
    it('sets where clause from graph pattern', () => {
        let pattern = new GraphPattern('?x foaf:mbox ?mbox');
        query.setWhereClause(pattern);
        query.toString().should.equal('SELECT * WHERE { ?x foaf:mbox ?mbox }');
    });
    it('sets order', () => {
        query.order('?foo');
        query.toString().should.equal('SELECT * WHERE { ?x foaf:mbox ?mbox } ORDER BY ?foo');
    });
    it('sets limit', () => {
        query.limit(10);
        query.toString().should.equal('SELECT * WHERE { ?x foaf:mbox ?mbox } ORDER BY ?foo LIMIT 10');
    });
    it('sets offset', () => {
        query.offset(5);
        query.toString().should.equal('SELECT * WHERE { ?x foaf:mbox ?mbox } ORDER BY ?foo LIMIT 10 OFFSET 5');
    });
    it('resets query', () => {
        query.reset();
        chai.expect(() => {
            query.toString();
        }).to.throw(Error);
    });
});