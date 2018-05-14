var gulp = require('gulp'),
    webpack = require('webpack');
//use webpack to bundle js
gulp.task('scripts',function(callback){
    webpack(require('../../webpack.config.js'),function(){
        callback();
    });
});