var gulp = require('gulp'),
	header = require('gulp-header'),
	bump = require('gulp-bump'),
	git = require('gulp-git'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	rename = require("gulp-rename"),
    karma = require('karma').server;

gulp.task('test-unit', function(done) {
    karma.start({
        configFile: __dirname + '\\test\\karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('dest', function() {
	gulp.src('./angular-confirm.js')
		.pipe(ngAnnotate())
		.pipe(uglify({preserveComments: 'all'}))
		.pipe(rename("angular-confirm.min.js"))
		.pipe(gulp.dest('./'))
});

gulp.task('bump-json', function (done) {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('bump', ['bump-json'], function() {
	var pkg = require('./package.json');
	var banner = ['/*',
	  ' * <%= pkg.name %>',
	  ' * <%= pkg.homepage %>',
	  ' * @version v<%= pkg.version %> - <%= today %>',
	  ' * @license <%= pkg.license %>',
	  ' */',
	  ''].join('\n');
	  
	function pad(val) {
		val = String(val);
		var len = 2;
		while (val.length < len) val = "0" + val;
		return val;
	}
	
	var date = new Date();
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	  
	return gulp.src('./angular-confirm.js')
		.pipe(header(banner, { pkg : pkg, today: (year + '-' + pad(monthIndex) + '-' + pad(day)) } ))
		.pipe(gulp.dest('./'));
});

gulp.task('tag', ['bump'], function () {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  return gulp.src('./')
    .pipe(git.commit(message))
    .pipe(git.tag(v, message))
    .pipe(git.push('origin', 'master', '--tags'))
    .pipe(gulp.dest('./'));
});

gulp.task('npm', ['tag'], function (done) {
  require('child_process').spawn('npm', ['publish'], { stdio: 'inherit' })
    .on('close', done);
});