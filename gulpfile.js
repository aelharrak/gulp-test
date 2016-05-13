var gulp = require('gulp');
    coffee = require('gulp-coffee'),
    less = require('gulp-less'),
    path = require('path'),
    compass = require('gulp-compass'), 
    watch = require('gulp-watch'),
    ts = require('gulp-typescript'),
    livereload = require('gulp-livereload'),
    image = require('gulp-image');



gulp.task('coffee', function () {
    return gulp.src('src/js/**/*.coffee')
               .pipe(coffee())
               .pipe(gulp.dest('./public/js'))
               .pipe(livereload());
});

gulp.task('typescript', function () {
    return gulp.src('src/js/ts/**/*.ts')
               .pipe(ts({
                    noImplicitAny: true,
                    out: 'output.js'
                    }))
               .pipe(gulp.dest('./public/js'))
               .pipe(livereload());
});

gulp.task('less', function () {
  return gulp.src('src/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('compass', function () {
    gulp.src('scss/*.scss')
        .pipe(compass())
        .pipe(gulp.dest('css'))
        .pipe(livereload());;
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('src/less/**/*.less',['less']);
    gulp.watch('src/js/ts/**/*.ts',['typescript']);
});

gulp.task('image', function () {
  gulp.src('./fixtures/*')
    .pipe(image())
    .pipe(gulp.dest('./dest'));
});

gulp.task('default', ['typescript','less','image'] , function(){

});