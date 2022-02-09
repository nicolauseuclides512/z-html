'use strict';

var path = require('path');
var ignore = require('gulp-ignore');
var gulp = require('gulp');
var less = require('gulp-less');
var rimraf = require('gulp-rimraf');
//CONFIG PATHS
var config = {
	assets_dark: 'dark/assets',
  assets_blue: 'blue/assets',
  assets_green: 'green/assets',
  assets_purple: 'purple/assets',
  assets_purple: 'dark_2/assets',
  assets_purple: 'horizontal/assets',
	build: 'css'
};

//TASKS
gulp.task('less-blue',['clean-blue'], function () {
  gulp.src(config.assets_blue + '/less/**/*.less')
    .pipe(less({
      paths: [config.assets_blue +'/less/']
    }))
    .pipe(gulp.dest(config.assets_blue + "/" + config.build));
});


gulp.task('clean-blue', function(cb){
	//return rimraf(config.assets_blue + "/" + config.build, cb);
	return gulp.src(config.assets_blue + "/" + config.build + '/**/*.css', { read: false }) // much faster
  	.pipe(ignore('bootstrap.min.css'))
  	.pipe(rimraf());
});


// ------------- green ---------------
gulp.task('less-green',['clean-green'], function () {
  gulp.src(config.assets_green + '/less/**/*.less')
    .pipe(less({
      paths: [config.assets_green +'/less/']
    }))
    .pipe(gulp.dest(config.assets_green + "/" + config.build));
});


gulp.task('clean-green', function(cb){
	return gulp.src(config.assets_green + "/" + config.build + '/**/*.css', { read: false }) // much faster
  	.pipe(ignore('bootstrap.min.css'))
  	.pipe(rimraf());
});

// ------------- dark ---------------
gulp.task('less-dark',['clean-dark'], function () {
  gulp.src(config.assets_dark + '/less/**/*.less')
    .pipe(less({
      paths: [config.assets_dark +'/less/']
    }))
    .pipe(gulp.dest(config.assets_dark + "/" + config.build));
});


gulp.task('clean-dark', function(cb){
	return gulp.src(config.assets_dark + "/" + config.build + '/**/*.css', { read: false }) // much faster
  	.pipe(ignore('bootstrap.min.css'))
  	.pipe(rimraf());
});


// ------------- purple ---------------
gulp.task('less-purple',['clean-purple'], function () {
  gulp.src(config.assets_purple + '/less/**/*.less')
    .pipe(less({
      paths: [config.assets_purple +'/less/']
    }))
    .pipe(gulp.dest(config.assets_purple + "/" + config.build));
});


gulp.task('clean-purple', function(cb){
	return gulp.src(config.assets_purple + "/" + config.build + '/**/*.css', { read: false }) // much faster
  	.pipe(ignore('bootstrap.min.css'))
  	.pipe(rimraf());
});

// ------------- dark_2 ---------------
gulp.task('less-dark_2',['clean-dark_2'], function () {
  gulp.src(config.assets_dark_2 + '/less/**/*.less')
    .pipe(less({
      paths: [config.assets_dark_2 +'/less/']
    }))
    .pipe(gulp.dest(config.assets_dark_2 + "/" + config.build));
});


gulp.task('clean-dark_2', function(cb){
  return gulp.src(config.assets_dark_2 + "/" + config.build + '/**/*.css', { read: false }) // much faster
    .pipe(ignore('bootstrap.min.css'))
    .pipe(rimraf());
});

// ------------- Horizontal ---------------
gulp.task('less-horizontal',['clean-horizontal'], function () {
  gulp.src(config.assets_horizontal + '/less/**/*.less')
    .pipe(less({
      paths: [config.assets_horizontal +'/less/']
    }))
    .pipe(gulp.dest(config.assets_horizontal + "/" + config.build));
});


gulp.task('clean-horizontal', function(cb){
  return gulp.src(config.assets_horizontal + "/" + config.build + '/**/*.css', { read: false }) // much faster
    .pipe(ignore('bootstrap.min.css'))
    .pipe(rimraf());
});

gulp.task('default', function() {
 console.log( "\nMoltran - Gulp Command List \n" );
 console.log( "----------------------------\n" );
 console.log( "gulp less-dark" );
 console.log( "gulp less-blue" );
 console.log( "gulp less-green" );
 console.log( "gulp less-purple" );
 console.log( "gulp less-dark_2" );
 console.log( "gulp less-horizontal" );
 console.log( "----------------------------\n" );
});