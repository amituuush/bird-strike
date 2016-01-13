// bourbon and neat not in 'site/scss' directory
// partials have not been implemented on sass files

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
  return gulp.src([
    'site/js/**/*.js',
    '!site/js/app.js'])
    .pipe(plumber({
      errorHandler: reportError
      }))
    .pipe(jshint()).on('error', reportError)
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

// Watch task
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch([
    'site/js/**/*.js',
    '!site/js/app.js'], ['jshint', 'scripts-combine']);
  gulp.watch('site/scss/*.scss', ['sass']);
  gulp.watch('site/index.html', ['html-reload']);
});


// Minify index
gulp.task('html', function() {
  return gulp.src('site/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// Combines all js files and sends to site/js
gulp.task('scripts-combine', function() {
  return browserify([
    'site/js/main.js',
    'site/js/flappy_bird.js',
    'site/js/components/graphics/bird.js',
    'site/js/components/graphics/pipe.js',
    'site/js/components/physics/physics.js',
    'site/js/components/physics/physics.js',
    'site/js/components/collision/circle.js',
    'site/js/components/collision/rect.js',
    'site/js/entities/bird.js',
    'site/js/entities/pipe.js',
    'site/js/entities/ceiling.js',
    'site/js/entities/floor.js',
    'site/js/entities/ground.js',
    'site/js/entities/counter.js',
    'site/js/systems/graphics.js',
    'site/js/systems/input.js',
    'site/js/systems/physics.js',
    'site/js/systems/collision.js',
    'site/js/systems/pipesystem.js',
    'site/js/systems/scoresystem.js',
    ])
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('site/js'))
});


// JavaScript build task, removes whitespace and concatenates all files, sends to build/js
gulp.task('scripts', function() {
  return gulp.src('site/js/app.js')
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('site/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
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

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);


// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'scripts-combine', 'styles', 'images']);
