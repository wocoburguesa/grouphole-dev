var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    ngAnnotate = require('gulp-ng-annotate'),
    del = require('del'),
    merge = require('event-stream').merge;

//    plugins = require('gulp-load-plugins')();
//    plugins.bower = require('main-bower-files');

var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});
plugins.bower = require('main-bower-files');

var BOWER_DIR = './bower_components/';

gulp.task('scripts', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(plugins.filter('**/*.js'))
        .pipe(ngAnnotate())
//        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('vendor', function () {
    var jsFiles = ['src/js/*'];

    console.log(plugins.mainBowerFiles());

    gulp.src(plugins.mainBowerFiles().concat(jsFiles))
        .pipe(plugins.filter('**/*.js'))
        .pipe(plugins.concat('vendor.js'))
        .pipe(plugins.uglify())
    //.pipe(/* doing something with the JS scripts */)
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('styles-vendor', function () {
    var vendor = gulp.src(plugins.bower(), { base: BOWER_DIR })
            .pipe(plugins.filter('**/*.css'))
            .pipe(plugins.print(function(filepath) {
                return "stylesheet: " + filepath;
            }));
    return vendor
        .pipe(plugins.concat('styles-vendor.css'))
        .pipe(gulp.dest('dist/assets/css'));

});

gulp.task('styles', function () {
    var vendor = gulp.src('app/css/**/*.css')
            .pipe(plugins.filter('**/*.css'))
            .pipe(plugins.print(function(filepath) {
                return "stylesheet: " + filepath;
            }));
    return vendor
        .pipe(plugins.concat('styles.css'))
        .pipe(gulp.dest('dist/assets/css'));

});

gulp.task('clean', function() {
  return del(['dist/assets/js']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('scripts', 'vendor', 'styles', 'styles-vendor');
});
