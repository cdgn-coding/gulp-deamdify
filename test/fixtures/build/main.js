var modules = {};
modules['file3'] = (function () {
  return console.log;
}).apply(
    modules['file3'],
    []
);
modules['file3'] = (function () {
  return console.log;
}).apply(
    modules['file3'],
    []
);
modules['file2'] = (function (file3) {
  return file3;
}).apply(
    modules['file2'],
    [modules['file3'],modules['file3']]
);
modules['file1'] = (function (file2) {
  return function(e) {
    file2(e);
  }
}).apply(
    modules['file1'],
    [modules['file2']]
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