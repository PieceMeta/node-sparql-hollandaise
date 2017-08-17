var http = require('http'),
    url = require('url'),
    Promise = require('bluebird');

import Result from './result';

export default class Transport {
    /**
     * Implements HTTP transport
     *
     * @class Transport
     * @constructor
     * @param {String} endpoint - SPARQL endpoint URL
     * @param {Object} auth - Optional authentication object (e.g.: { basic: { username: <USER>, password: <PASS> } })
     * @param {String} method - HTTP method used (default: 'POST')
     */
    constructor(endpoint, auth = {}, method = 'POST') {
        this._endpoint = endpoint;
        this._auth = auth;
        this._method = method;
    }

    /**
     * Implements HTTP transport
     *
     * @method submit
     * @param {String} queryString - SPARQL query string
     * @returns {Promise} - Returns a Promise that will yield the Result object
     */
    submit(queryString) {
        var instance = this;
        return new Promise(function (resolve, reject) {
            var headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/sparql-results+json',
            };
            if (instance._auth && instance._auth.basic) {
                var authBuffer = new Buffer(`${instance._auth.basic.username}:${instance._auth.basic.password}`);
                headers.Authorization = `Basic ${authBuffer.toString('base64')}`;
            }
            var data = '', parsedUri = url.parse(instance._endpoint),
                encodedQuery = `query=${encodeURIComponent(queryString)}`,
                request = http.request({
                    method: instance._method,
                    hostname: parsedUri.hostname,
                    port: parsedUri.port,
                    path: parsedUri.path,
                    headers: Object.assign(headers, {
                        'Content-Length': encodedQuery.length
                    })
                }, function (response) {
                    response.setEncoding('utf8');
                    response.on('data', function (chunk) {
                        data += chunk;
                    });
                    response.on('end', function () {
                        if (response.statusCode === 200) {
                            resolve(data);
                        } else {
                            reject(new Error(data));
                        }
                    });
                });

            request.on('error', reject);

            request.write(encodedQuery);
            request.end();
        })
        .then(function (data) {
            return new Result(JSON.parse(data));
        })
        .catch(function (err) {
            throw new Error(`QBuilder query failed: ${err.message}`);
        });
    }
}