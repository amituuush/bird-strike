var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src('site/js/*.js')
    .pipe(plumber({
      errorHandler: reportError
      }))
    .pipe(jshint()).on('error', console.log)
    .pipe(jshint.reporter('default'));
});

// Compile Sass task
gulp.task('sass', function() {
  return gulp.src('site/scss/*.scss')
    .pipe(plumber({
      errorHandler: reportError
      }))
    .pipe(sass()).on('error', reportError)
//    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('site/css'))
    .pipe(livereload());
});

var reportError = function (error) {
    var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

    notify({
        title: 'Task Failed [' + error.plugin + ']',
        message: lineNumber + 'See console.',
        sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
    }).write(error);

    gutil.beep(); // Beep 'sosumi' again

    // Inspect the error object
    //console.log(error);

    // Easy error reporting
    //console.log(error.toString());

    // Pretty error reporting
    var report = '';
    var chalk = gutil.colors.white.bgRed;

    report += chalk('TASK:') + ' [' + error.plugin + ']\n';
    report += chalk('PROB:') + ' ' + error.message + '\n';
    if (error.lineNumber) { report += chalk('LINE:') + ' ' + error.lineNumber + '\n'; }
    if (error.fileName)   { report += chalk('FILE:') + ' ' + error.fileName + '\n'; }
    console.error(report);

    // Prevent the 'watch' task from stopping
    this.emit('end');
}

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('site/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});


// Minify index
gulp.task('html', function() {
  return gulp.src('site/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

//JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('site/js/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Image optimization task
gulp.task('images', function() {
  return gulp.src('site/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

// HTML Reload task
gulp.task('html-reload', function() {
  return gulp.src('site/index.html') 
    .pipe(livereload());
  });

// Watch task
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('site/js/*.js', ['jshint']);
  gulp.watch('site/scss/*.scss', ['sass']);
  gulp.watch('site/index.html', ['html-reload']);
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images']);


