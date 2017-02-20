gulp = require 'gulp'
coffee = require 'gulp-coffee'
gutil = require 'gulp-util'
plumber = require 'gulp-plumber'
deamdfy = require './index.js'

handler = (error) ->
  gutil.log(
    (gutil.colors.inverse error.name), 'found during compilation',
    'Check', error.filename,
    'on line', error.location.first_line
  )
  this.emit 'end'


gulp.task 'default', ['build', 'watch']

gulp.task 'build', () ->
  return gulp.src 'src/*.coffee'
    .pipe plumber handler
    .pipe coffee bare:true
    .pipe gulp.dest '.'

gulp.task 'watch', () ->
  return gulp.watch 'src/*.coffee', ['build']


gulp.task 'test', () ->
  return gulp.src 'test/*.js'
    .pipe deamdfy()
    .pipe gulp.dest 'test/build'