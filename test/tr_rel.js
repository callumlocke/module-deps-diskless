var mdeps = require('../');
var test = require('tape');
var JSONStream = require('JSONStream');
var packer = require('browser-pack');

test('transform', function (t) {
    t.plan(1);
    var p = mdeps({
        transformKey: [ 'browserify', 'transform' ]
    });
    p.end(__dirname + '/files/tr_rel/subdir/main.js');
    var pack = packer();
    
    p.pipe(JSONStream.stringify()).pipe(pack);
    
    var src = '';
    pack.on('data', function (buf) { src += buf });
    pack.on('end', function () {
        Function('console', src)({ log: function (msg) {
            t.equal(msg, 333);
        } });
    });
});
