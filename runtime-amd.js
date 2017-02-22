var define, require,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

require = function(deps, code) {
  return define.prototype.executeFactory(null, code, deps);
};

define = function(name, deps, code) {
  return define.modules[name] = define.prototype.executeFactory(null, code, deps);
};

define.prototype.executeFactory = function(scope, code, deps) {
  var indexed;
  define.modules.exports = {};
  indexed = deps.indexOf('exports');
  return define.prototype.modulefactory(scope, code, define.prototype.selectDeps(deps), indexed)();
};

define.prototype.modulefactory = function(scope, code, deps) {
  if (indexOf.call(deps, 'exports') >= 0) {
    return define.prototype.fromExport;
  } else {
    return define.prototype.fromReturn;
  }
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
