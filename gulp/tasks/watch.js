var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

//创建watch任务，如果src中的js文件有变化,就触发scriptRefresh任务
gulp.task('watch',function(){
    watch('./src/js/**/*.js',function(){
        gulp.start('Refresh');
    })

    watch('./src/index.html',function(){
        gulp.start('Refresh');
    })
});


//刷新网页
gulp.task('Refresh',['scripts','copyhtml'],function(){
    browserSync.reload();
})

//创建默认任务，建立服务器，同时触发watch任务
gulp.task('default', ['watch'], function() {

    browserSync.init({
        server: "./dist"
    });
});
