
///<amd-module name='./App'/>

import Module1 from './namespace/Module1'

export default class App extends Module1 {
    constructor() {
      super();
      let message = document.createElement('div');
      message.innerHTML = 'Hello World!';
      message.className = 'message'
      document
        .querySelector('body')
        .appendChild(message);
    }
    initialize() {
        return this;
    }
    run() {
        return this;
    }
}