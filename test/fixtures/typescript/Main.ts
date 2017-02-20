declare let require;
const dependencies = ['./App'];
const initializer  = (App) => {
    let myApp = new App.default()
    myApp.initialize().run()
}
require(dependencies, initializer);