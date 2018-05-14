var gulp = require('gulp'),
    rename = require('gulp-rename');

gulp.task('copyhtml',function(){
    gulp.src('../../src/index.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('../../src'));
});