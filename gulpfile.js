'use strict';

// sass compile
var gulp = require('gulp');
var sass = require('gulp-sass');
var prettify = require('gulp-prettify');
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var rtlcss = require("gulp-rtlcss");  
var connect = require('gulp-connect');

//*** Localhost server task
gulp.task('localhost', function() {
  connect.server();
});

gulp.task('localhost-live', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('localhost-live:minify', ['localhost-live', 'sass', 'minify', 'live:minify']);

//*** SASS compiler task
gulp.task('sass', function () {
  // bootstrap compilation
	gulp.src('./sass/bootstrap.scss').pipe(sass()).pipe(gulp.dest('./assets/global/plugins/bootstrap/css/'));

  // select2 compilation using bootstrap variables
	gulp.src('./assets/global/plugins/select2/sass/select2-bootstrap.min.scss').pipe(sass({outputStyle: 'compressed'})).pipe(gulp.dest('./assets/global/plugins/select2/css/'));

  // global theme stylesheet compilation
	gulp.src('./sass/global/*.scss').pipe(sass()).pipe(gulp.dest('./assets/global/css'));
	gulp.src('./sass/apps/*.scss').pipe(sass()).pipe(gulp.dest('./assets/apps/css'));
	gulp.src('./sass/pages/*.scss').pipe(sass()).pipe(gulp.dest('./assets/pages/css'));

  // theme layouts compilation
	gulp.src('./sass/layouts/layout/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout/css'));
  gulp.src('./sass/layouts/layout/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout/css/themes'));

  gulp.src('./sass/layouts/layout2/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout2/css'));
  gulp.src('./sass/layouts/layout2/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout2/css/themes'));

  gulp.src('./sass/layouts/layout3/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout3/css'));
  gulp.src('./sass/layouts/layout3/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout3/css/themes'));

  gulp.src('./sass/layouts/layout4/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout4/css'));
  gulp.src('./sass/layouts/layout4/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout4/css/themes'));

  gulp.src('./sass/layouts/layout5/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout5/css'));

  gulp.src('./sass/layouts/layout6/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout6/css'));

  gulp.src('./sass/layouts/layout7/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout7/css'));
});

//*** SASS watch(realtime) compiler task
gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('live:minify', function () {
	// js live minify
	gulp.watch('./assets/apps/scripts/!(*.min.js).js', { interval: 250 }, function(event) {
		gulp.src(event.path).pipe(uglify()).on('error', swallowError).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/apps/scripts/'));
	});
	gulp.watch('./assets/global/scripts/!(*.min.js).js', { interval: 250 }, function(event) {
		gulp.src(event.path).pipe(uglify()).on('error', swallowError).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/global/scripts'));
	});
	gulp.watch('./assets/pages/scripts/!(*.min.js).js', { interval: 250 }, function(event) {
		gulp.src(event.path).pipe(uglify()).on('error', swallowError).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/pages/scripts'));
	});
	gulp.watch('./assets/layouts/**/scripts/!(*.min.js).js', { interval: 250 }, function(event) {
		gulp.src(event.path).pipe(uglify()).on('error', swallowError).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/layouts/'));
	});
	// css live minify
	gulp.watch('./assets/apps/css/!(*.min.css).css', { interval: 250 }, function(event) {
		gulp.src(event.path).pipe(minifyCss()).on('error', swallowError).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/apps/css/'));
	});
	gulp.watch('./assets/global/css/!(*.min.css).css', { interval: 250 }, function(event) {
		gulp.src(event.path).pipe(minifyCss()).on('error', swallowError).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/global/css/'));
	});
	gulp.watch('./assets/pages/css/!(*.min.css).css', { interval: 250 }, function(event) {
		gulp.src(event.path).pipe(minifyCss()).on('error', swallowError).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/pages/css/'));
	});
	gulp.watch('./assets/layouts/**/css/!(*.min.css).css', { interval: 250 }, function(event) {
		gulp.src(event.path).pipe(rename({suffix: '.min'})).pipe(minifyCss()).on('error', swallowError).pipe(gulp.dest(function(file) {	return file.base }));
	});
	gulp.watch('./assets/layouts/**/css/**/!(*.min.css).css', { interval: 250 }, function(event) {
		gulp.src(event.path).pipe(rename({suffix: '.min'})).pipe(minifyCss()).on('error', swallowError).pipe(gulp.dest(function(file) {	return file.base }));
	});
	gulp.watch('./assets/global/plugins/bootstrap/css/!(*.min.css).css', { interval: 250 }, function(event) {
		gulp.src(event.path).pipe(rename({suffix: '.min'})).pipe(minifyCss()).on('error', swallowError).pipe(gulp.dest('./assets/global/plugins/bootstrap/css/'));
	});
	//sass live compile
	  // bootstrap compilation
	gulp.watch('./sass/bootstrap.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/bootstrap.scss').pipe(sass()).pipe(gulp.dest('./assets/global/plugins/bootstrap/css/'));
	});

  // select2 compilation using bootstrap variables
	gulp.watch('./assets/global/plugins/select2/sass/select2-bootstrap.min.scss', { interval: 250 }, function(event) {
		gulp.src('./assets/global/plugins/select2/sass/select2-bootstrap.min.scss').pipe(sass({outputStyle: 'compressed'})).pipe(gulp.dest('./assets/global/plugins/select2/css/'));
	});

  // global theme stylesheet compilation
    gulp.watch('./sass/global/*.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/global/*.scss').pipe(sass()).pipe(gulp.dest('./assets/global/css'));
	});
	gulp.watch('./sass/apps/*.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/apps/*.scss').pipe(sass()).pipe(gulp.dest('./assets/apps/css'));
	});
	gulp.watch('./sass/pages/*.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/pages/*.scss').pipe(sass()).pipe(gulp.dest('./assets/pages/css'));
	});

  // theme layouts compilation
    gulp.watch('./sass/layouts/layout/*.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/layouts/layout/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout/css'));
	});

	gulp.watch('./sass/layouts/layout/themes/*.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/layouts/layout/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout/css/themes'));
	});

	gulp.watch('./sass/layouts/layout2/*.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/layouts/layout2/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout2/css'));
	});

	gulp.watch('./sass/layouts/layout2/themes/*.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/layouts/layout2/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout2/css/themes'));
	});

	gulp.watch('./sass/layouts/layout3/*.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/layouts/layout3/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout3/css'));
	});

	gulp.watch('./sass/layouts/layout3/themes/*.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/layouts/layout3/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout3/css/themes'));
	});

	gulp.watch('./sass/layouts/layout4/*.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/layouts/layout4/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout4/css'));
	});

	gulp.watch('./sass/layouts/layout4/themes/*.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/layouts/layout4/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout4/css/themes'));
	});

	gulp.watch('./sass/layouts/layout5/*.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/layouts/layout5/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout5/css'));
	});

	gulp.watch('./sass/layouts/layout6/*.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/layouts/layout6/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout6/css'));
	});

	gulp.watch('./sass/layouts/layout7/*.scss', { interval: 250 }, function(event) {
		gulp.src('./sass/layouts/layout7/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout7/css'));
	});
});

//*** CSS & JS minify task
gulp.task('minify', function () {
    // css minify 
    gulp.src(['./assets/apps/css/*.css', '!./assets/apps/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/apps/css/'));

    gulp.src(['./assets/global/css/*.css','!./assets/global/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/global/css/'));
    gulp.src(['./assets/pages/css/*.css','!./assets/pages/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/pages/css/'));    
    
    gulp.src(['./assets/layouts/**/css/*.css','!./assets/layouts/**/css/*.min.css']).pipe(rename({suffix: '.min'})).pipe(minifyCss()).pipe(gulp.dest('./assets/layouts/'));
    gulp.src(['./assets/layouts/**/css/**/*.css','!./assets/layouts/**/css/**/*.min.css']).pipe(rename({suffix: '.min'})).pipe(minifyCss()).pipe(gulp.dest('./assets/layouts/'));

    gulp.src(['./assets/global/plugins/bootstrap/css/*.css','!./assets/global/plugins/bootstrap/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/global/plugins/bootstrap/css/'));

    //js minify
    gulp.src(['./assets/apps/scripts/*.js','!./assets/apps/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/apps/scripts/'));
    gulp.src(['./assets/global/scripts/*.js','!./assets/global/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/global/scripts'));
    gulp.src(['./assets/pages/scripts/*.js','!./assets/pages/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/pages/scripts'));
    gulp.src(['./assets/layouts/**/scripts/*.js','!./assets/layouts/**/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/layouts/'));
});

//*** RTL convertor task
gulp.task('rtlcss', function () {

  gulp
    .src(['./assets/apps/css/*.css', '!./assets/apps/css/*-rtl.min.css', '!./assets/apps/css/*-rtl.css', '!./assets/apps/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./assets/apps/css'));

  gulp
    .src(['./assets/pages/css/*.css', '!./assets/pages/css/*-rtl.min.css', '!./assets/pages/css/*-rtl.css', '!./assets/pages/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./assets/pages/css'));

  gulp
    .src(['./assets/global/css/*.css', '!./assets/global/css/*-rtl.min.css', '!./assets/global/css/*-rtl.css', '!./assets/global/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./assets/global/css'));

  gulp
    .src(['./assets/layouts/**/css/*.css', '!./assets/layouts/**/css/*-rtl.css', '!./assets/layouts/**/css/*-rtl.min.css', '!./assets/layouts/**/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./assets/layouts'));

  gulp
    .src(['./assets/layouts/**/css/**/*.css', '!./assets/layouts/**/css/**/*-rtl.css', '!./assets/layouts/**/css/**/*-rtl.min.css', '!./assets/layouts/**/css/**/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./assets/layouts'));

  gulp
    .src(['./assets/global/plugins/bootstrap/css/*.css', '!./assets/global/plugins/bootstrap/css/*-rtl.css', '!./assets/global/plugins/bootstrap/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./assets/global/plugins/bootstrap/css')); 
});

//*** HTML formatter task
gulp.task('prettify', function() {
  	
  	gulp.src('./**/*.html').
  	  	pipe(prettify({
    		indent_size: 4, 
    		indent_inner_html: true,
    		unformatted: ['pre', 'code']
   		})).
   		pipe(gulp.dest('./'));
});

function swallowError (error) {
  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}