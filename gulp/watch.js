var gulp = require('gulp'),
    watch = require('gulp-watch');

gulp.task('watch', function() {
    gulp.watch('server/**/*.js', ['server']);
    gulp.watch('app/styles/*.scss', ['scss']);
});