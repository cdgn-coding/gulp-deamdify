///<amd-module name='./App'/>

import * as Module1 from './namespace/Module1'

export default class App {
    initialize() {
        console.log(Module1)
        return this;
    }
    run() {
        return this;
    }
}