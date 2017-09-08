import Query from './query'
import Transport from './transport'

export default class QueryFactory {
  /**
   * The QueryFactory can be used to create queries sharing Transport, Base and Prefix(es)
   *
   * @class QueryFactory
   * @constructor
   * @param {String} endpoint - URL of the SPARQL endpoint
   * @param {Object} auth - Optional authentication object (e.g.: { basic: { username: <USER>, password: <PASS> } })
   * @param {String} method - HTTP method used (default: 'GET')
   */
  constructor(endpoint, auth = {}, method = 'GET', base = undefined, prefix = undefined) {
    this._transport = new Transport(endpoint, auth, method);
    this._base = base;
    this._prefix = prefix;
  }

  /**
   * Returns a new, not yet typed Query object based on the current settings
   *
   * @method make
   * @returns {Query} - Returns new Query instance (chainable)
   */
  make() {
    const query = new Query(this._transport);
    if (this._base) {
      query.base(this._base);
    }
    if (this._prefix) {
      query.prefix(this._prefix);
    }
    return query;
  }
}
