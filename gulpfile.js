// Gulpfile
const child = require('child_process');
const spawn = require('cross-spawn')
const browserSync = require('browser-sync').create();

const gulp = require('gulp');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const image = require('gulp-image');
const sourcemaps = require('gulp-sourcemaps');
const prefix = require('gulp-autoprefixer');

const siteRoot = '_site';
const cssFiles = '_sass/**/*.?(s)css';
const jsFiles = '_js/**/*.js';
const imgFiles = '_images/*';
const vidFiles = '_video/*';


gulp.task('fonts', () => {
  gulp.src('bower_components/font-awesome/fonts/*')
    .pipe(gulp.dest(siteRoot + '/assets/fonts'))
});

gulp.task('css', () => {
  gulp.src(cssFiles)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefix())
    .pipe(concat('style.css'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(siteRoot + '/assets/css'));

  gulp.src('bower_components/lightbox2/dist/css/lightbox.min.css')
    .pipe(gulp.dest(siteRoot + '/assets/css'));
});

gulp.task('js', () => {
  gulp.src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify({
      preserveComments: 'true'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(siteRoot + '/assets/js'));

  gulp.src('bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(siteRoot + '/assets/js'));

  gulp.src('bower_components/skrollr/dist/skrollr.min.js')
    .pipe(gulp.dest(siteRoot + '/assets/js'));

  gulp.src('bower_components/lightbox2/dist/js/lightbox.min.js')
    .pipe(gulp.dest(siteRoot + '/assets/js'));
});

gulp.task('image', () => {
  gulp.src(imgFiles)
    .pipe(image())
    .pipe(gulp.dest(siteRoot + '/assets/img'));

  gulp.src('bower_components/lightbox2/dist/images/**/*')
    .pipe(gulp.dest(siteRoot + '/assets/images'));
});

gulp.task('video', () => {
  gulp.src(vidFiles)
    .pipe(gulp.dest(siteRoot + '/assets/vid'));
});

gulp.task('jekyll', () => {
  const jekyll = spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  gulp.watch(cssFiles, ['css']);
  gulp.watch(jsFiles, ['js']);
  gulp.watch(imgFiles, ['image']);
});

gulp.task('default', ['css', 'js', 'image', 'video', 'fonts', 'jekyll', 'serve']);
