
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


var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("./namespace/Module1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Module1 = (function () {
        function Module1() {
        }
        Module1.prototype.Method = function () {
            console.log('Inherited method');
        };
        return Module1;
    }());
    exports.default = Module1;
});
define("./App", ["require", "exports", "./namespace/Module1"], function (require, exports, Module1_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.initialize = function () {
            return this;
        };
        App.prototype.run = function () {
            return this;
        };
        return App;
    }(Module1_1.default));
    exports.default = App;
});
var dependencies = ['./App'];
var initializer = function (App) {
    return new App.default();
};
require(dependencies, initializer);

