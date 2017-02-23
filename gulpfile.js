var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    sass   = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    util   = require('gulp-util');

//sass dependencies
var sassPaths = [
    "bower_components/font-awesome/scss/",
    "bower_components/foundation-sites/scss",
    "bower_components/motion-ui/src"
];

//javascript files
var javascriptFiles= [
    "bower_components/jquery/dist/jquery.js",
    "bower_components/what-input/dist/what-input.js",
    "bower_components/foundation-sites/dist/js/foundation.js"
];

//destination root
var dest = typeof util.env.dest == 
    'string' ? util.env.dest : 'public';

gulp.task("build", function() {
    //compile sass
    gulp.src('./resources/scss/app.scss')
    .pipe(gulpif(!util.env.nocompress, 
        //compress css output
        sass({
            includePaths: sassPaths, 
            outputStyle: 'compressed'
        }),
        //or not... to allow debugging
        sass({
            includePaths: sassPaths
        })))
    .pipe(gulp.dest(dest + '/css'));

    //concat and minify it
    gulp.src(javascriptFiles)
    .pipe(concat('app.js'))
    .pipe(gulpif(!util.env.nocompress,
        uglify({
            mangle: true
        })
    ))
    .pipe(gulp.dest(dest + '/js'));

    //copy fonts, again, look into doing a list
    gulp.src('bower_components/font-awesome/fonts/*')
    .pipe(gulp.dest(dest + '/fonts'));
});

gulp.task('watch', function() {
});

gulp.task('default', function() {
});