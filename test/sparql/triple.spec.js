'use strict';

let chai = require('chai');
chai.should();

import Triple from '../../src/sparql/triple';

describe('Triple', () => {
    it('create triple from full string', () => {
        let triple = new Triple('?x foo:bar ?label');
        triple.toString().should.equal('?x foo:bar ?label');
    });
    it('create triple from subject, predicate and object', () => {
        let triple = new Triple('?x', 'foo:bar', '?label');
        triple.toString().should.equal('?x foo:bar ?label');
    });
    it('create triple from subject and predicate-object list', () => {
        let triple = new Triple('?x', ['foo:bar ?label', 'foo:bar ?label']);
        triple.toString().should.equal('?x foo:bar ?label ; foo:bar ?label');
    });
    it('create triple from subject, predicate and object list', () => {
        let triple = new Triple('?x foo:bar', ['"baz"', '"bar"']);
        triple.toString().should.equal('?x foo:bar "baz" , "bar"');
    });
});