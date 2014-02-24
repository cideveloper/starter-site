var exec      = require('child_process').exec;
var sys       = require('sys');
var path      = require('path');
var gulp      = require('gulp');
var gutil     = require('gulp-util');
var less      = require('gulp-less');
var minifycss = require('gulp-minify-css');
var uglify    = require('gulp-uglify');
var rename    = require("gulp-rename");
var refresh   = require('gulp-livereload');
var lr        = require('tiny-lr');
var server    = lr();

gulp.task('default', ['lr-server', 'styles', 'scripts', 'watch']);

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('styles', function() {
  return gulp.src('public/assets/less/styles.less')
    .pipe(less())
    .pipe(minifycss())
    .pipe(rename(function (dir, base, ext) {
        return base + ".min" + ext;
    }))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(refresh(server));
});

gulp.task('scripts', function() {
  return gulp.src('public/assets/js/src/*.js')
    .pipe(uglify())
    .pipe(rename(function (dir, base, ext) {
        return base + ".min" + ext;
    }))
    .pipe(gulp.dest('public/assets/js/dist'))
    .pipe(refresh(server));
});

gulp.task('watch', function() {
  gulp.watch('public/assets/less/*.less', ['styles']);
  gulp.watch('public/assets/js/src/*.js', ['scripts']);
  gulp.watch('index.php', ['scripts']);
});

