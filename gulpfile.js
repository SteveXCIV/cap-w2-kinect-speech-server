const babel = require('gulp-babel');
const clean = require('gulp-clean');
const gulp = require('gulp');
const merge = require('merge-stream');
const sourcemaps = require('gulp-sourcemaps');

const buildDir = 'build';
const sourceDir = './src'

gulp.task('build', () => {
    let es6 = gulp.src(sourceDir + '/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildDir));

    let deps = gulp.src([sourceDir + '/**/*', '!' + sourceDir + '/**/*.js'])
        .pipe(gulp.dest(buildDir));

    return merge(es6, deps);
});

gulp.task('clean', () => {
    return gulp.src(buildDir).pipe(clean());
});
