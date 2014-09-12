var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');
var stripDebug = require('gulp-strip-debug');

var distFolder = './dist';

var files = [
  './src/response.js',
  './src/request.js',
  './src/github.js',
  './src/repo-element.js'
];

var wrapper = [
  '(function() {',
    '"use strict";',
    '<%= contents %>',
  '}.bind(typeof window !== "undefined" ? window : {})());'
].join('\n');

gulp.task('build', ['standalone', 'bundled']);

gulp.task('standalone', function() {
  gulp.src(files)
    .pipe(stripDebug())
    .pipe(concat('github-element.js'))
    .pipe(wrap(wrapper))
    .pipe(uglify())
    .pipe(gulp.dest(distFolder));
});

gulp.task('bundled', function() {
  gulp.src([
      './bower_components/skatejs/dist/skate.js',
      './bower_components/template-html/dist/skate-template-html.js',
    ].concat(files))
    .pipe(stripDebug())
    .pipe(concat('github-element-bundled.js'))
    .pipe(wrap(wrapper))
    .pipe(uglify())
    .pipe(gulp.dest(distFolder));
});
