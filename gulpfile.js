var pkg = require('./package.json'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    minify = require('gulp-minify'),
    header = require('gulp-header'),
    banner = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''].join('\n');

gulp.task('build-web', function () {
    return browserify('./src/index.js', {
            fullPaths: false,
            insertGlobals: false,
            debug: false,
            standalone: 'SPH'
        })
        .transform(babelify, {
            presets: ['es2015'],
            plugins: ['transform-runtime']
        })
        .bundle()
        .pipe(source('sparql-hollandaise.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('./dist/web/'));
});

gulp.task('build-node', function () {
    return gulp.src(['./src/**/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/node/'));
});

gulp.task('default', ['build-web', 'build-node']);