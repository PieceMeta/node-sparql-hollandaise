var pkg = require('./package.json'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
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

gulp.task('build-client', function () {
    return browserify('./index.js', {
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
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build-client']);