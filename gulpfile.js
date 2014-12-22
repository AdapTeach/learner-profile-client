var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jasmine = require('gulp-jasmine'),
    nodemon = require('gulp-nodemon'),
    stub = require('learner-profile-stub')();

var pathToSrc = [ 'src/**/*.js', 'gulpfile.js', 'test'],
    pathToTests = 'test/**/*';

gulp.task('default', ['dev'], function () {
});

gulp.task('dev',['lint'], function () {
    nodemon({
        script: 'src/index.js',
        ext: 'js',
        env: {'NODE_ENV': 'development'}
    })
        .on('change', ['lint']);
});

gulp.task('lint', function () {
    gulp.src(pathToSrc)
        .pipe(jshint({
            strict: false
        }))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('tests',function(){
    stub.start();
    gulp.src(pathToTests)
        .pipe(jasmine())
});