'use strict';

var http = require('http'),
    url = require('url'),
    Promise = require('bluebird'),
    SparqlResult = require('./result');

class SparqlTransport {
    constructor(endpoint) {
        this._endpoint = endpoint;
    }

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
                var result = new SparqlResult(JSON.parse(data));
                return result;
            })
            .catch(function (err) {
                throw new Error(`QBuilder query failed: ${err.message}`);
            });
    }
}

module.exports = SparqlTransport;