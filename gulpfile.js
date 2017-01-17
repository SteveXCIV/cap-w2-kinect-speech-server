const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

const project = ts.createProject('tsconfig.json');

gulp.task('build', () => {
    const output = project.src().pipe(project());
    return output.js.pipe(gulp.dest(project.options.outDir));
});

gulp.task('copy', () => {
    return gulp.src('./src/**/*', '!./**/*.ts')
        .pipe(gulp.dest(project.options.outDir));
});

gulp.task('clean', () => {
    return gulp.src(project.options.outDir).pipe(clean());
});
