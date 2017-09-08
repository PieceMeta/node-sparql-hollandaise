import QueryFactory from '../../src/sparql/query-factory';
import Transport from '../../src/sparql/transport'
import Query from '../../src/sparql/query'
import Prefix from '../../src/sparql/prefix'

let chai = require('chai');
chai.should();

const auth = { basic: { username: 'user', password: 'pass' } };

describe('QueryFactory', () => {
  it('initializes factory with endpoint, auth and method', () => {
    const queryFactory = new QueryFactory('http://localhost', auth, 'POST');

    queryFactory.should.be.instanceOf(QueryFactory);
    queryFactory._transport.should.be.instanceOf(Transport);
    queryFactory._transport._endpoint.should.equal('http://localhost');
    queryFactory._transport._auth.should.deep.equal(auth);
    queryFactory._transport._method.should.equal('POST');
  });
  it('initializes factory with endpoint, auth and method; adds base and prefix', () => {
    const base = '<http://example.org/foo/>',
      prefix = 'foo: <http://bar>',
      queryFactory = new QueryFactory('http://localhost', auth, 'POST', base, prefix);

    queryFactory.should.be.instanceOf(QueryFactory);
    queryFactory._base.should.equal(base);
    queryFactory._prefix.should.equal(prefix);
  });
  it('returns a new Query object', () => {
    const base = '<http://example.org/foo/>',
      prefix = 'foo: <http://bar>',
      queryFactory = new QueryFactory('http://localhost', auth, 'POST', base, prefix),
      query = queryFactory.make();

    query.should.be.instanceOf(Query);
    query._transport.should.deep.equal(queryFactory._transport);
    query._config.base.should.equal(queryFactory._base);
    query._config.prefixes.should.deep.equal([ new Prefix(queryFactory._prefix) ]);
  });
});