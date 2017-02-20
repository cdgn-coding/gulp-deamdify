var modules = {};
modules['file1'] = (function () {
  return function(e) {
    file2(e);
  }
}).apply(
  modules['file1'],
  []
);
modules['file3'] = (function () {
  return console.log;
}).apply(
  modules['file3'],
  []
);
var main = (function (file1) {
  file1('Hello world!');
}).apply(
  main,
  [modules['file1'],modules['file3']]
);