'use strict';

let chai = require('chai');
chai.should();

import GroupGraphPattern from '../../src/sparql/group-graph-pattern';
import GraphPattern from '../../src/sparql/graph-pattern';
import Triple from '../../src/sparql/triple';

describe('GroupGraphPattern', () => {
    let triple = new Triple('?x foaf:mbox ?mbox');
    it('creates group pattern from array of patterns', () => {
        let pattern1 = new GraphPattern(triple),
            pattern2 = new GraphPattern([triple, triple]),
            group = new GroupGraphPattern([pattern1, pattern2]);
        group.toString().should.equal('{ { ?x foaf:mbox ?mbox } { ?x foaf:mbox ?mbox . ?x foaf:mbox ?mbox . } }');
    });
});