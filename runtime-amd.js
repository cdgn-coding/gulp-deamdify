var define, main, require,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

main = {};

require = function(deps, code) {
  return main = define.prototype.factory(main, code, deps);
};

define = function(name, deps, code) {
  define.modules.exports = {};
  return define.modules[name] = define.prototype.factory(define.modules[name], code, deps);
};

define.prototype.factory = function(scope, code, deps) {
  var generator, indexed;
  generator = indexOf.call(deps, 'exports') >= 0 ? define.prototype.fromExport : define.prototype.fromReturn;
  indexed = deps.indexOf('exports');
  return generator(scope, code, define.prototype.selectDeps(deps), indexed);
};

define.prototype.getModule = function(name) {
  return define.modules[name];
};

define.prototype.selectDeps = function(deps) {
  return deps.map(define.prototype.getModule);
};

define.prototype.fromExport = function(scope, code, deps, indexed) {
  code.apply(scope, deps);
  return deps[indexed];
};

define.prototype.fromReturn = function(scope, code, deps) {
  return code.apply(scope, deps);
};

define.modules = {};

define.modules.require = define.prototype.getModule;
