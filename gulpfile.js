const babel = require('gulp-babel');
const clean = require('gulp-clean');
const gulp = require('gulp');
const merge = require('merge-stream');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const autoprefix = require('gulp-autoprefixer');
const concat = require('gulp-concat');

const buildDir = 'build';
const sourceDir = './src'

gulp.task('build', (done) => {
    let es6 = gulp.src(sourceDir + '/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildDir));

    let deps = gulp.src([
            sourceDir + '/**/*',
            '!' + sourceDir + '/**/*.js',
            '!' + sourceDir + '/public/**/*.less'
        ])
        .pipe(gulp.dest(buildDir));

    let css = gulp.src(sourceDir + '/public/css/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less({ paths: ['./bower_components/bootstrap/less'] }))
        .pipe(autoprefix())
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildDir + '/public/css'));

    let ngAngular = gulp.src(sourceDir + '/../bower_components/angular-avatar/dist/angular-avatar.min.js')
        .pipe(gulp.dest(buildDir + '/public/scripts'));

    return merge(es6, deps, ngAngular)
        .on('error', (err) => done(err));
});

gulp.task('clean', (done) => {
    return gulp.src(buildDir)
        .pipe(clean())
        .on('error', (err) => done(err));
});
