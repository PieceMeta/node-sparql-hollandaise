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
     */
    constructor(endpoint) {
        this._endpoint = endpoint;
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
                var data = '', parsedUri = url.parse(instance._endpoint),
                    encodedQuery = `query=${encodeURIComponent(queryString)}`,
                    request = http.request({
                        method: 'POST',
                        hostname: parsedUri.hostname,
                        port: parsedUri.port,
                        path: parsedUri.path,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/sparql-results+json',
                            'Content-Length': encodedQuery.length
                        }
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
                var result = new Result(JSON.parse(data));
                return result;
            })
            .catch(function (err) {
                throw new Error(`QBuilder query failed: ${err.message}`);
            });
    }
}