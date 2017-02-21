define("App", ["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.initialize = function () {
            return this;
        };
        App.prototype.run = function () {
            return this;
        };
        return App;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = App;
});
var dependencies = ['./App'];
var initializer = function (App) {
    return new App.default();
};
require(dependencies, initializer);
define("./namespace/Module1", ["require", "exports"], function (require, exports) {
    "use strict";
    var Module1 = (function () {
        function Module1(e) {
            console.log(e);
        }
        return Module1;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Module1;
});
