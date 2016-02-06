let chai = require('chai');
chai.should();

import Result from '../../src/sparql/result';

describe('Result', () => {
    it('returns object for response data containing result property', () => {
        let result = new Result({
            results: {
                bindings: []
            },
            head: {
                vars: [],
                link: ''
            }
        });
        result.should.deep.equal({
            bindings: [],
            vars: [],
            link: ''
        });
    });
    it('returns object for response data containing boolean property', () => {
        let result = new Result({
            boolean: true
        });
        result.should.deep.equal({
            boolean: true
        });
    });
});