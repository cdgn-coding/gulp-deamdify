declare const require;
const dependencies = ['./App'];
const initializer  = (App) => {
    return new App.default();
}
require(dependencies, initializer);