var __utils, define, require;

__utils = {
  currentAllowed: [],
  getProperty: function(object, key) {
    return object[key];
  },
  setProperty: function(object, key, value) {
    return object[key] = value;
  },
  getPosition: function(array, position) {
    return array[position];
  },
  generateArrayFrom: function(args) {
    return Array.prototype.slice.call(args);
  },
  selectDependencies: function(all, required) {
    return required.map(function(name) {
      return this.getPosition(all, name);
    });
  },
  toTuples: function(argument, i) {
    return {
      'key': this.getProperty(this.currentAllowed, i),
      'value': argument
    };
  },
  toAsociative: function(map, param) {
    this.setProperty(map, this.getProperty(param, 'key'), this.getProperty(param, 'value'));
    return map;
  }
};

require = function() {
  return define.allowed = this.allowed = ['code', 'deps'];
};

define = function() {
  var module;
  __utils.currentAllowed = define.allowed = ['code', 'deps', 'name'];
  define.modules = {} || define.modules;
  define.modules.exports = {};
  define.modules.require = require;
  return module = __utils.generateArrayFrom(arguments).reverse().map(__utils.toTuples.bind(__utils));
};
