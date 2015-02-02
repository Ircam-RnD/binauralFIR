var browserify = require('browserify');
var browserifyIstanbul = require('browserify-istanbul');
var es6ify = require('es6ify');
var fs = require('fs');
var istanbulTraceur = require('istanbul-traceur');
var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var open = require('open');
var bodyParser = require('body-parser');
var istanbul = require('istanbul');

var app = connect();
app.use(bodyParser.json());
var server = app.listen(3000);

var instrumenter = new istanbulTraceur.Instrumenter();

browserify({
    debug: true
  })
  .add(es6ify.runtime)
  .transform(browserifyIstanbul({
    instrumenter: instrumenter
  }))
  .transform(es6ify)
  .require('./tests/tests.js', {
    entry: true
  })
  .bundle(function(err, buf) {
    var wstream = fs.createWriteStream("./browser-test/tests.js");
    wstream.write(buf);
    wstream.end();
    serve();
  });

function serve() {
  app.use(serveStatic('browser-test', {
    'index': ['index.html']
  }));
  // @todo Get data from mocha run in the shell
  app.use('/__test__', function fooMiddleware(req, res, next) {
  });
  app.use('/__coverage__', function fooMiddleware(req, res, next) {
    fs.writeFileSync('coverage1.json', JSON.stringify(req.body));
    generateCoverageReport(req.body);
  });
  open("http://0.0.0.0:3000", "firefox");
}

function generateCoverageReport(json) {
  var collector = new istanbul.Collector(),
    reporter = new istanbul.Reporter(),
    sync = false;
    collector.add(json);
    reporter.add('text');
    reporter.addAll([ 'lcov', 'clover' ]);
    reporter.write(collector, sync, function () {
        console.log('All reports generated');
        server.close();
        process.exit(code=0);
    });
}
