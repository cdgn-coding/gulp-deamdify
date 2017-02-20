var Vinyl, through;

through = require('through2');

Vinyl = require('vinyl');

module.exports = function(options) {
  var deamdfy, define, defineFactory, lastest, main, modules, reduceModules, require, requireFactory, transverse, unify;
  lastest = void 0;
  modules = new Object;
  main = new Object;
  options = options || {};
  options.exports = options.exports || 'main';
  options.outputs = options.outputs || 'main.js';
  requireFactory = function(module) {
    var code, dep, deps, j, len, ref;
    code = module.code;
    deps = [];
    ref = module.deps;
    for (j = 0, len = ref.length; j < len; j++) {
      dep = ref[j];
      deps.push("modules['" + dep + "']");
    }
    return "var " + options.exports + " = (" + code + ").apply(\n    " + options.exports + ",\n    [" + (deps.toString()) + "]\n);";
  };
  defineFactory = function(name, module) {
    var code, dep, deps, j, len, ref;
    code = module.code;
    deps = [];
    ref = module.deps;
    for (j = 0, len = ref.length; j < len; j++) {
      dep = ref[j];
      deps.push("modules['" + dep + "']");
    }
    return "modules['" + name + "'] = (" + code + ").apply(\n    modules['" + name + "'],\n    [" + (deps.toString()) + "]\n);\n";
  };
  unify = function(transversed) {
    var i, name;
    for (i in transversed) {
      name = transversed[i];
      if (!modules[name].found) {
        modules[name].found = true;
      } else {
        transversed.splice(i, 1);
      }
    }
    return transversed;
  };
  transverse = function(deps, modules) {
    var dep, future, j, len;
    future = [];
    if (deps.length !== 0) {
      for (j = 0, len = deps.length; j < len; j++) {
        dep = deps[j];
        future = future.concat(transverse(modules[dep].deps, modules));
      }
    }
    future = future.concat(deps);
    return future;
  };
  require = function(deps, fn) {
    main.code = fn.toString();
    return main.deps = deps;
  };
  define = function(name, deps, fn) {
    return modules[name] = {
      'code': fn.toString(),
      'deps': deps,
      'found': false
    };
  };
  deamdfy = function(file, enc, cb) {
    eval(file.contents.toString());
    lastest = file;
    return cb();
  };
  reduceModules = function(s, name) {
    return s.concat(defineFactory(name, modules[name]));
  };
  return through({
    objectMode: true
  }, deamdfy, function() {
    var content, order, stream;
    order = unify(transverse(main.deps, modules));
    content = order.reduce(reduceModules, 'var modules = {};').concat(requireFactory(main));
    stream = new Vinyl({
      cwd: lastest.cwd,
      base: lastest.base,
      path: lastest.path,
      contents: new Buffer(content)
    });
    return this.push(stream);
  });
};
