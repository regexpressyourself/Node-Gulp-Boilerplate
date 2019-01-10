const gulp         = require('gulp');
const sass         = require('gulp-sass');
const minifyCSS    = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const concat       = require('gulp-concat');
const sourcemaps   = require('gulp-sourcemaps');
const babel        = require('gulp-babel');
const browserify   = require('browserify');
const babelify     = require('babelify');
const source       = require('vinyl-source-stream');
const buffer       = require('vinyl-buffer');
const uglify       = require('gulp-uglify');
const livereload   = require('gulp-livereload');
const debug        = require('gulp-debug');
const dest         = require('gulp-dest');
const gutil        = require('gulp-util');
const mustache     = require("gulp-mustache");

gulp.task('js', () => {
  // add in js sources in the order they should be parsed
  return gulp.src([
    'public/static/js/external/*.js',
    'public/static/js/services/*.js',
    'public/static/js/**/*.js',
    '!public/static/js/min/*'
  ])
  // create sourcemap
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [
        '@babel/env'
      ]
    }))
    .on('error', (err) => {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/static/js/min'))
});

gulp.task('css', () => {
  return gulp.src('public/static/css/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie11'}))
    .pipe(gulp.dest('public/static/css/min'));
});

gulp.task('mustache', () => {
  gulp.src("public/html/pages/*.html")
    .pipe(mustache({},{},{}))
    .pipe(gulp.dest("public/html/dist"));
});


gulp.task('watch', ['css', 'js', 'mustache'], () => {
  gulp.watch('public/static/css/**/*.scss', ['css']);
  gulp.watch('public/static/js/**/*.js', ['js']);
  gulp.watch('public/html/**/*.{html,mustache}', ['mustache']);
});


gulp.task('default', [ 'css', 'js', 'mustache', 'watch']);
