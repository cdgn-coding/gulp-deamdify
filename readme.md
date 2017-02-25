## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-deamdify`

## Information

<table>
  <tr>
    <td>Package</td>
    <td>gulp-deamdify</td>
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

Suppose you are writing a library in Javascript (or in any other compile-to-javascript language) and you would want to split it 
in more than one file without having external dependencies. 

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

This plugin polyfills the code with a tiny AMD library and concatenates the results in order to get
an one-file script that does exactly what your original code does. *Note that this plugin won't order your files,*
*you'll have to use another plugin such as gulp-amd-optimizer*

## Reason to be

1. It can be used with gulp-umd in order to take a library written under AMD format and compile it to UMD format, so it can be later used with RequireJs and CommonJs.

2. It is possible to transpile Typescript to Javascript using AMD module resolution, and transform the result to code that does not depend on external dependencies.

3. It is an alternative to Babel's deamdify, since it can be used with Typescript or CoffeeScript.

## Usage

### Usage with Javascript
```js
var deamdify = require('gulp-deamdify');
var optimizer = require('gulp-amd-optimizer');

gulp.task('build', function() {
  return gulp.src('src/**/*.js')
    .pipe(optimizer({baseUrl: '/my-base-url/'}))
    .pipe(deamdify({
      outputs : 'my-library.js',
    }))
    .pipe(gulp.dest('dist/'));
});
```

### Usage with Typescript
```js
var deamdify = require('gulp-deamdify');
var ts = require('gulp-typescript');

gulp.task 'build', () ->
    return gulp.src('src/**/*.ts')
      .pipe(ts({
          "module": "amd",
          "target": "es5",
          "noImplicitAny": false,
          "sourceMap": false,
          "removeComments" : true,
          "outFile" : 'compiled.js'
      })).pipe(deamdify({outputs:'my-library.js'}))
      .pipe(gulp.dest('dist/'))
```

### Usage with gulp-umd
```js
var deamdify = require('gulp-deamdify');
var ts = require('gulp-typescript');
var umd = require('gulp-umd');
gulp.task('build', () => {
    return gulp
        .src('src/**/*.ts')
        .pipe(ts({
            "module": "amd",
            "target": "es5",
            "noImplicitAny": false,
            "sourceMap": false,
            "removeComments" : true,
            "outFile"  : 'compiled.js'
        }))
        .pipe(deamdify({outputs:'Cherry.js'}))
        .pipe(umd({
          'exports' : 'main'
        }))
        .pipe(gulp.dest('dist/'));
});
```


## Contribute

Please feel free to fork or post and issue if you feel like.

## License

Published under MIT License.
