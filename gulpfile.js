var ENV = process.env.NODE_ENV || 'development';
if (ENV === 'development') {
  require('dotenv').load();
}
var gulp = require('gulp'),
  less = require('gulp-less'),
  jade = require('gulp-jade'),
  bower = require('gulp-bower'),
  gutil = require('gulp-util'),
  jshint = require('gulp-jshint'),
  browserify = require('browserify'),
  path = require('path'),
  reporter = require('gulp-codeclimate-reporter'),
  source = require('vinyl-source-stream'),
  imagemin = require('gulp-imagemin'),
  nodemon = require('gulp-nodemon'),
  karma = require('gulp-karma'),
  protractor = require('gulp-protractor').protractor,
  mocha = require('gulp-mocha'),
  paths = {
    public: 'public/**',
    jade: ['!app/shared/**', 'app/**/*.jade'],
    scripts: 'app/**/*.js',
    images: 'app/images/**/*',
    staticFiles: [
      '!app/**/*.+(less|css|js|jade)',
      '!app/images/**/*',
      'app/**/*.*'
    ],
    unitTests: [],
    serverTests: ['./tests/server/**/*.spec.js'],
    libTests: ['lib/tests/**/*.js'],
    styles: 'app/styles/*.+(less|css)'
  };

gulp.task('less', function() {
  gulp.src(paths.styles)
    .pipe(less({
      paths: [path.join(__dirname, './app/styles')]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('./public/'));
});

gulp.task('images', function() {
  gulp.src(paths.images)
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./public/images/'));
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/lib/'));
});

gulp.task('browserify', function() {
  return browserify('./app/scripts/application.js').bundle()
    .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
    .on('error', gutil.log.bind(gutil, 'Browserify ' +
      'Error: in browserify gulp task'))
    // vinyl-source-stream makes the bundle compatible with gulp
    .pipe(source('application.js')) // Desired filename
    // Output the file
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('lint', function() {
  return gulp.src(['./app/**/*.js', './index.js',
      './server/**/*.js', './tests/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('static-files', function() {
  return gulp.src(paths.staticFiles)
    .pipe(gulp.dest('public/'));
});

gulp.task('nodemon', function() {
  nodemon({
      script: 'index.js',
      ext: 'js',
      ignore: ['public/', 'node_modules/']
    })
    .on('change', ['lint'])
    .on('restart', function() {
      console.log('>> node restart');
    });
});

gulp.task('test:fend', ['browserify', 'bower'], function() {
  // Be sure to return the stream
  return gulp.src(paths.unitTests)
    .pipe(karma({
      configFile: __dirname + '/karma.conf.js',
      // autoWatch: false,
      // singleRun: true
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('test:bend', function() {
  return gulp.src(paths.serverTests)
    .pipe(mocha({
      reporter: 'spec'
    }))
    .once('error', function(err) {
      throw err;
    });
});

gulp.task('test:e2e', function(cb) {
  gulp.src(['./tests/e2e/*.js'])
    .pipe(protractor({
      configFile: './protractor.conf.js',
      args: ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('error', function(e) {
      console.log(e);
    })
    .on('end', cb);
});

gulp.task('codeclimate-reporter', ['test:fend', 'test:bend'], function() {
  return gulp.src(['coverage/report-lcov/lcov.info'], {
      read: false
    })
    .pipe(reporter({
      token: process.env.CODECLIMATE_REPO_TOKEN,
      verbose: true
    }));
});

gulp.task('watch', function() {
  // livereload.listen({ port: 35729 });
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styles, ['less']);
  gulp.watch(paths.scripts, ['browserify']);
  // gulp.watch(paths.public).on('change', livereload.changed);
});

gulp.task('build', ['jade', 'less', 'static-files',
  'images', 'browserify', 'bower'
]);
gulp.task('heroku:production', ['build']);
gulp.task('heroku:staging', ['build']);
gulp.task('production', ['nodemon', 'build']);
gulp.task('test', ['test:fend', 'test:bend', 'codeclimate-reporter']);
gulp.task('default', ['nodemon', 'watch', 'build']);
