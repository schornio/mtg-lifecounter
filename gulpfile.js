'use strict';

let DISTRIBUTION_DIR = __dirname + '/dist';
let SRC_DIR = __dirname + '/app';

let gulp = require('gulp');
var wrap = require('gulp-wrap');
let babel = require('gulp-babel');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');

gulp.task('default', [ 'copy_index', 'copy_include', 'copy_view', 'compile_scripts' ]);

gulp.task('copy_index', function () {
  gulp.src(SRC_DIR + '/index.html')
    .pipe(gulp.dest(DISTRIBUTION_DIR));
});

gulp.task('copy_include', function () {
  let includePath = '/include';
  gulp.src(SRC_DIR + includePath + '/**/*')
    .pipe(gulp.dest(DISTRIBUTION_DIR + includePath));
});

gulp.task('copy_view', function () {
  let viewPath = '/view';
  gulp.src(SRC_DIR + viewPath + '/**/*')
    .pipe(gulp.dest(DISTRIBUTION_DIR + viewPath));
});

gulp.task('compile_scripts', function () {
  gulp.src([ SRC_DIR + '/script/namespaces.js', SRC_DIR + '/script/**/!(index).js', SRC_DIR + '/script/**/index.js' ])
    .pipe(wrap({ src: SRC_DIR + '/script/script_wrapper.txt' }))
    .pipe(babel())
    .pipe(concat('script.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest(DISTRIBUTION_DIR));
});

gulp.task('watch', [ 'default' ], function () {
  gulp.watch(SRC_DIR + '/**/*', [ 'default' ]);
});
