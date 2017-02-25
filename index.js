var Vinyl, fs, path, through;

through = require('through2');

Vinyl = require('vinyl');

path = require('path');

fs = require('fs');

module.exports = function(options) {
  var contents, flush, lastest, transform;
  lastest = false;
  contents = '';
  options = options || {};
  options.outputs = options.outputs || 'main.js';
  transform = function(file, enc, cb) {
    contents += "\n" + (file.contents.toString()) + "\n";
    lastest = file;
    return cb();
  };
  flush = function(cb) {
    var output, polyfill;
    if (lastest) {
      polyfill = fs.readFileSync(__dirname + '/runtime-amd.js', 'utf8');
      contents = ("\n" + polyfill + "\n") + contents;
      output = lastest.clone();
      output.contents = new Buffer(contents);
      output.path = path.join(lastest.base, options.outputs);
      this.push(output);
    }
    return cb();
  };
  return through({
    objectMode: true
  }, transform, flush);
};
