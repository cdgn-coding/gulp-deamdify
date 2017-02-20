var modules = { require : function(e) {return this[e]; } };
modules['./namespace/Module1'] = (function() {
  var exports = {};
  (function (require, exports) {
    "use strict";
    var Module1 = (function () {
        function Module1(e) {
            console.log(e);
        }
        return Module1;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Module1;
}).apply(
    modules['./namespace/Module1'],
    [modules['require'],exports]
  )
  return exports;
})()
modules['./App'] = (function() {
  var exports = {};
  (function (require, exports, Module1) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.initialize = function () {
            console.log(Module1);
            return this;
        };
        App.prototype.run = function () {
            return this;
        };
        return App;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = App;
}).apply(
    modules['./App'],
    [modules['require'],exports,modules['./namespace/Module1']]
  )
  return exports;
})()
var main = (function (App) {
    var myApp = new App.default();
    myApp.initialize().run();
}).apply(
  main,
  [modules['./App']]
);