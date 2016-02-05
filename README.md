# SPARQL Hollandaise

[![Code Climate](https://codeclimate.com/github/PieceMeta/node-sparql-hollandaise/badges/gpa.svg)](https://codeclimate.com/github/PieceMeta/node-sparql-hollandaise) [![Dependency Status](https://david-dm.org/PieceMeta/node-sparql-hollandaise.svg)](https://david-dm.org/PieceMeta/node-sparql-hollandaise) [![devDependency Status](https://david-dm.org/PieceMeta/node-sparql-hollandaise/dev-status.svg)](https://david-dm.org/PieceMeta/node-sparql-hollandaise#info=devDependencies)

A JS client lib to communicate with a triple store database through SPARQL queries over HTTP.

## Stability

Experimental: Expect the unexpected. Please provide feedback on api and your use-case.

## Disclaimer

If you think this is a fully fledged SPARQL client for JS: nope. This is rather a starting point than a complete implementation. Also, I am not exactly an expert in using SPARQL (that's an understatement) so there might be all sorts of bullshit going on in the lib. Feel free to bash me in the issues...

## Install

**Node:** ``npm install git://github.com/PieceMeta/node-sparql-hollandaise.git``

**Browser:** ``bower install git://github.com/PieceMeta/node-sparql-hollandaise.git``

## Usage

Node:
```javascript
var SPH = require('sparql-hollandaise'),
    query = new SPH.Query('https://here.goes.the/endpoint');
```

Browser:
```html
<head>
    <script type="text/javascript" src="/bower_components/babel-polyfill/browser-polyfill.js"></script>
    <script type="text/javascript" src="/bower_components/sparql-hollandaise/dist/web/sparql-hollandaise.js"></script>
</head>
```

Make sure to check out the basic [Angular example](https://github.com/PieceMeta/ng-sparql-hollandaise-example) as well.

### Creating Graph Patterns

The ``.where()`` function takes either a single ``GraphPattern`` object, or a ``GroupGraphPattern`` that in turn contains multiple ``GraphPattern`` objects.

```javascript
var graphPattern = new SPH.GraphPattern(
    ['array of triple strings'] ||
    'single triple string' ||
    new SPH.Filter('filter string')
);

// additional args for the GraphPattern
var graphPatternOptional = new SPH.GraphPattern('my super triple', true, false); // this pattern is OPTIONAL
var graphPatternAlternative = new SPH.GraphPattern('my super triple', false, true); // this pattern is an alternative (UNION)

var groupGraphPattern = new SPH.GraphPattern([graphPattern, graphPatternAlternative] || graphPattern);
groupGraphPattern.addElement(graphPatternOptional);
```

Once you have created your pattern, you can pass it to any of the queries.

### SELECT
```javascript
var query = new SPH.Query('https://here.goes.the/endpoint')
    .prefix(['foo: <http://bar>', 'pre: <http://fix>'] || 'pre: <http://fix>')
    .select('*') // you can add 'DISTINCT' or 'REDUCED' as a modifier in the second parameter
    .from('dataset clause', true) // second param indicates a named dataset (only pass this if named set)
    // you can add items to the where clause in any order
    // and at any time before calling exec()
    .where(graphPattern)
    .order('order string')
    .limit(10)
    .offset(5)
    .exec().then(function (result) {
        console.log(result);
    });
```

### DESCRIBE
```javascript
var query = new SPH.Query('https://here.goes.the/endpoint')
    .prefix('foo: <http://bar>')
    .describe('?x')
    .where(graphPattern)
    .exec().then(function (result) {
       console.log(result);
    });
```
    
### ASK
```javascript
var query = new SPH.Query('https://here.goes.the/endpoint')
    .prefix('foo: <http://bar>')
    .ask()
    .where(graphPattern)
    .exec().then(function (result) {
       console.log(result);
    });
```
    
### CONSTRUCT
```javascript
var query = new SPH.Query('https://here.goes.the/endpoint')
    .prefix('foo: <http://bar>')
    .construct(['array of triple strings'] || 'single triple string')
    .where(graphPattern)
    .order('order string')
    .limit(10)
    .offset(5)
    .exec().then(function (result) {
       console.log(result);
    });
```

### Other methods

These might be useful to you:

```javascript
// get the query's string representation that will be sent to the server
var queryString = query.toString();

// reset the entire query to reuse the object
query.reset();

```

## Development

API docs for the classes in ``src/sparql/`` can be [found here](http://piecemeta.github.io/node-sparql-hollandaise/doc/)

The classes in ``src/`` use most of the ES6 keywords, so transpiling is necessary. The project uses [gulp](http://gulpjs.com/), [Babel](https://babeljs.io/) and [Browserify](http://browserify.org/).

```shell
npm install
# build browser lib and transpile for NodeJS
gulp
# you can also do:
gulp build-web
gulp build-node
```

Run the tests with ``npm test`` and generate code coverage with ``npm run-script cover`` ([view coverage](http://piecemeta.github.io/node-sparql-hollandaise/coverage/lcov-report/)).

YUIDocs can be generated with ``npm run-script docs``.


## Credits

This client was conceived at a hackathon initiated by the [Pina Bausch Foundation](www.pinabausch.org) at the [Mediencampus Hochschule Darmstadt](https://mediencampus.h-da.de) in December 2015.
