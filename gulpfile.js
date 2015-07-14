var gulp = require('gulp'),
    karma = require('karma').server;

gulp.task('test-unit', function(done) {
    karma.start({
        configFile: __dirname + '\\test\\karma.conf.js',
        singleRun: true
    }, done);
});