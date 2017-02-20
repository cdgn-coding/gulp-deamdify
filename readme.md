![status](https://secure.travis-ci.org/contra/gulp-concat.svg?branch=master)

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-concat`

## Information

<table>
<tr>
<td>Package</td><td>gulp-deamdify</td>
</tr>
<tr>
<td>Description</td>
<td>Converts a module written in various files and AMD format in an autonomous one-file module.</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 1.0.0</td>
</tr>
</table>

## Inspiration

Suppose you are writing a javascript (or any other compile-to-javascript language) library and you would want to split in more 
than one file without having external dependencies. Aditionally, you want your library to be under UDM format so it can be 
imported with CommonJS and requirejs.

In example, let's say you have this library

```js
// Main.js
require(['file1', 'file3'], function(file1, file3) {
  file1('Hello world!');
})

// file3.js
define('file3', [], function() {
  return console.log;
})

// file2.js
define('file2', ['file3'], function(file3) {
  return file3;
})

// file1.js
define('file1', ['file2'], function(file2) {
  return function(e) {
    file2(e);
  }
})
```

Using this plugin you can generate autonomous browser compatible code that does exactly the same

```js
var modules = {};
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
    [modules['file3']]
);
modules['file1'] = (function (file2) {
  return function(e) {
    file2(e);
  }
}).apply(
    modules['file1'],
    [modules['file2']]
);
var main = (function (file1, file3) {
  file1('Hello world!');
}).apply(
    main,
    [modules['file1'], modules['file3']]
);
```

### Note
1. It has been created to be used with gulp-umd, which takes one file to wrap.
2. It is possible to use Typescript and transpile with AMD format, then use this plugin along with gulp-umd
to write splited libraries or modules in a strong language like typescript, make use of imports and exports and have a 
makes-sense result in UMD format.

These two were the main reasons why I wrote this plugin.

## Usage

```js
var deamdify = require('gulp-deamdify');

gulp.task('build', function() {
  return gulp.src('src/**/*.js')
    .pipe(deamdify({
      outputs : 'my-library.js',
      exports : 'myLibrary'
    }))
    .pipe(gulp.dest('dist/'));
});
```

## Current constraints notes

* Only handles one file which makes a require([...] function(...) {...}) call
* It expects that all files from gulp.src contain all submodules
* More than one define can be found in one file, but it's pretty recommended to use one define per file
* It expects no circular dependencies
* It transverses the dependency tree to properly order the code.

## Contribute

Feel free to post an issue if you feel like or fork

## License

Published under MIT License.