var gulp = require('gulp');
var to5 = require('gulp-6to5');
var concat = require('gulp-concat');
var flow = require('gulp-flowtype');
var jasmine = require('gulp-jasmine');

var jsSrc = 'src/**/*.js';
var specSrc = 'spec/**/*.js';
var jsDest = 'fluent-cursor.js';

gulp.task('watch', function () {
  gulp.watch([jsSrc, specSrc], ['default']);
});

gulp.task('flow', function() {
  return gulp.src(jsSrc)
    .pipe(flow({
      beep: false
    }));
});

gulp.task('spec', function () {
  return gulp.src(specSrc)
  .pipe(jasmine());
});

gulp.task('compile', function () {
  return gulp.src(jsSrc)
  .pipe(to5())
  .pipe(concat(jsDest))
  .pipe(gulp.dest('.'));
});

gulp.task('default', ['flow', 'compile', 'spec']);
