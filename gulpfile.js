var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var pjson = require('./package.json');
var template = require('gulp-template');
var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'remove-proxy', 'inject-version']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

var replace = require('replace');
var replaceFiles = ['./www/js/app.js'];

gulp.task('add-proxy', function() {
    replace({
        regex: "http://es.misscatandzuozuo.info/mongoindex/thing/_search",
        replacement: "http://localhost:8100/search",
        paths: replaceFiles,
        recursive: false,
        silent: false
    });
    replace({
        regex: "http://172.26.142.29:9000/api/users*",
        replacement: "http://localhost:8100/users",
        paths: replaceFiles,
        recursive: false,
        silent: false
    });
    replace({
        regex: "http://172.26.142.29:9000/api/historys",
        replacement: "http://localhost:8100/historys",
        paths: replaceFiles,
        recursive: false,
        silent: false
    });
    replace({
        regex: "https://api.github.com/repos/zycbobby/easy_download_html5/releases?access_token=1ef3730630641b51272e2d7b10e4bf2a86648fbc",
        replacement: "http://localhost:8100/releases",
        paths: replaceFiles,
        recursive: false,
        silent: false
    });
});

gulp.task('remove-proxy', function() {
    replace({
        regex: "http://localhost:8100/users",
        replacement: "http://172.26.142.29:9000/api/users",
        paths: replaceFiles,
        recursive: false,
        silent: false
    });
    replace({
        regex: "http://localhost:8100/historys",
        replacement: "http://172.26.142.29:9000/api/historys",
        paths: replaceFiles,
        recursive: false,
        silent: false
    });
    replace({
        regex: "http://localhost:8100/historys/_search",
        replacement: "http://172.26.142.29:9000/api/historys/_search",
        paths: replaceFiles,
        recursive: false,
        silent: false
    });
    replace({
        regex: "http://localhost:8100/search",
        replacement: "http://es.misscatandzuozuo.info/mongoindex/thing/_search",
        paths: replaceFiles,
        recursive: false,
        silent: false
    });
    replace({
        regex: "http://localhost:8100/releases",
        replacement: "https://api.github.com/repos/zycbobby/easy_download_html5/releases?access_token=1ef3730630641b51272e2d7b10e4bf2a86648fbc",
        paths: replaceFiles,
        recursive: false,
        silent: false
    });
});


gulp.task('inject-version', function(){
    return gulp.src('version.js')
        .pipe(template({ versionString : pjson.version }))
        .pipe(gulp.dest('www/js'));
});
