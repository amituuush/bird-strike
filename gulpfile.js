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


gulp.task('jshint', function() {
  return gulp.src([
    'app/js/**/*.js',
    'site/js/*.js',
    '!app/js/app.js'])
    .pipe(plumber({
      errorHandler: reportError
      }))
    .pipe(jshint()).on('error', reportError)
    .pipe(jshint.reporter('default'));

});

// Styles build task, concatenates all the files
// gulp.task('styles', function() {
//   return gulp.src(['site/scss/*.scss', 'app/scss/*.scss'])
//     .pipe(concat('stylesheet.scss'))
//     .pipe(gulp.dest('scss'));
// });

gulp.task('sass-site', function() {
  return gulp.src('site/scss/*.scss')
    .pipe(plumber({
      errorHandler: reportError
      }))
    .pipe(sass()).on('error', reportError)
//    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
    // .pipe(livereload());
});

gulp.task('sass-game', function() {
  return gulp.src('app/scss/*.scss')
    .pipe(plumber({
      errorHandler: reportError
      }))
    .pipe(sass()).on('error', reportError)
//    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
    // .pipe(livereload());
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


// Minify index
gulp.task('html-site', function() {
  return gulp.src('site/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest(''));
});

gulp.task('html-game', function() {
  return gulp.src('app/game.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest(''));
});

// Combines all js files and sends to site/js
gulp.task('scripts-combine-game', function() {
  return browserify([
    'app/js/main.js',
    'app/js/flappy_bird.js',
    'app/js/components/collision/circle.js',
    'app/js/components/collision/rect.js',
    'app/js/components/collision/counter.js',
    'app/js/components/graphics/background.js',
    'app/js/components/graphics/bird.js',
    'app/js/components/graphics/ceiling.js',
    'app/js/components/graphics/counter.js',
    'app/js/components/graphics/floor.js',
    'app/js/components/graphics/ground.js',
    'app/js/components/graphics/pipe.js',
    'app/js/components/physics/physics.js',
    'app/js/entities/background.js',
    'app/js/entities/bird.js',
    'app/js/entities/ceiling.js',
    'app/js/entities/counter.js',
    'app/js/entities/floor.js',
    'app/js/entities/ground.js',
    'app/js/entities/pipe.js',
    'app/js/systems/backgroundsystem.js',
    'app/js/systems/collision.js',
    'app/js/systems/graphics.js',
    'app/js/systems/groundsystem.js',
    'app/js/systems/input.js',
    'app/js/systems/physics.js',
    'app/js/systems/pipesystem.js',
    'app/js/systems/scoresystem.js'
    ])
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('js/nonmin'))
});

gulp.task('scripts-combine-site', function() {
  return browserify('site/js/app.js')
    .bundle()
    .pipe(source('site.js'))
    .pipe(gulp.dest('js/nonmin'))
});

// JavaScript build task, removes whitespace and concatenates all files, sends to build/js
gulp.task('scripts-game', function() {
  return gulp.src('js/nonmin/app.js')
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('scripts-site', function() {
  return gulp.src('js/nonmin/site.js')
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});


// Image optimization task
gulp.task('images', function() {
  return gulp.src(['site/img/*', 'app/img/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('img'));
});

// HTML Reload task
gulp.task('html-reload', function() {
  return gulp.src('index.html')
    .pipe(livereload());
  });


// Watch task
gulp.task('watch', function() {
livereload.listen();
gulp.watch([
  'site/js/**/*.js',
  '!site/js/app.js'], ['jshint', 'scripts-combine']);
gulp.watch('site/scss/*.scss', ['sass']);
gulp.watch('site/index.html', ['html-reload']);
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);


// Build task
gulp.task('build', ['jshint', 'sass-site', 'sass-game', 'html-site', 'html-game', 'scripts-combine-site', 'scripts-combine-game', 'images', 'scripts-site', 'scripts-game']);
