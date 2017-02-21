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
  (function (require, exports, Module1_1) {
    "use strict";
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.initialize = function () {
            console.log(Module1_1.default);
            return this;
        };
        App.prototype.run = function () {
            return this;
        };
        return App;
    }(Module1_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = App;
}).apply(
    modules['./App'],
    [modules['require'],exports,modules['./namespace/Module1']]
  )
  return exports;
})()
var main = (function (App) {
    return new App.default();
}).apply(
  main,
  [modules['./App']]
);