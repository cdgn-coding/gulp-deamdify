var Vinyl, lodash, path, through;

through = require('through2');

Vinyl = require('vinyl');

path = require('path');

lodash = require('lodash');

module.exports = function(options) {
  var continueStream, define, defineFactory, formatDependencies, formatModules, hasMain, lastest, main, modules, parseModule, require, requireFactory, transverse, unify;
  lastest = false;
  hasMain = false;
  modules = new Object;
  main = new Object;
  options = options || {};
  options.exports = options.exports || 'main';
  options.outputs = options.outputs || 'main.js';
  formatDependencies = function(dependencies) {
    return lodash.map(dependencies, function(dependency) {
      return "modules['" + dependency + "']";
    }).toString();
  };
  requireFactory = function(module) {
    return "var " + options.exports + " = (" + module.code + ").apply(\n    " + options.exports + ",\n    [" + (formatDependencies(module.deps)) + "]\n);";
  };
  defineFactory = function(name, module) {
    return "modules['" + name + "'] = (" + module.code + ").apply(\n    modules['" + name + "'],\n    [" + (formatDependencies(module.deps)) + "]\n);\n";
  };
  unify = function(transversed) {
    return transversed.reduce(function(tree, current) {
      if (!lodash.some(tree, function(dependency) {
        return dependency === current;
      })) {
        return tree.concat(current);
      } else {
        return tree;
      }
    }, new Array());
  };
  transverse = function(deps, modules) {
    return deps.reduce(function(acumulated, current) {
      return acumulated.concat(transverse(modules[current].deps, modules));
    }, new Array()).concat(deps);
  };
  require = function(deps, fn) {
    main.code = fn.toString();
    return main.deps = deps;
  };
  define = function(name, deps, fn) {
    return modules[name] = {
      'code': fn.toString(),
      'deps': deps
    };
  };
  formatModules = function(acumulated, name) {
    return acumulated.concat(defineFactory(name, modules[name]));
  };
  parseModule = function(file, enc, cb) {
    eval(file.contents.toString());
    lastest = file;
    return cb();
  };
  continueStream = function(cb) {
    var built, content, order;
    order = unify(transverse(main.deps, modules));
    content = order.reduce(formatModules, 'var modules = {};\n').concat(requireFactory(main));
    built = lastest.clone();
    built.contents = new Buffer(content);
    built.path = path.join(lastest.base, options.outputs);
    this.push(built);
    return cb();
  };
  return through({
    objectMode: true
  }, parseModule, function(cb) {
    if (!(hasMain && lastest)) {
      return cb();
    } else {
      return continueStream(cb);
    }
  });
};
