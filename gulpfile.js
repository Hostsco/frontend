var gulp =          require('gulp');
var concat =        require('gulp-concat');
var connect =       require('gulp-connect');
var argv =          require('yargs').argv;
var gulpif =        require('gulp-if');
var jshint =        require('gulp-jshint');
var beautify =      require('gulp-beautify');
var please =        require('gulp-pleeease');
var rename =        require('gulp-rename');
var replace =       require('gulp-replace');
var sass =          require('gulp-sass');
var sassThemes =    require('gulp-sass-themes');
var uglify =        require('gulp-uglify');
var prettify =      require('gulp-prettify');
var cssbeautify =   require('gulp-cssbeautify');
var ext_replace =   require('gulp-ext-replace');
var processhtml =   require('gulp-processhtml');
var del =           require('del');
var path =          require('path');
var runSequence =   require('run-sequence').use(gulp);
var imagemin =      require('gulp-imagemin');
var changed =       require('gulp-changed');
var merge =         require('merge-stream');
var sourcemaps =    require('gulp-sourcemaps');


var config =        require('./gulp/config');

var paths = {
    dist : path.join(config.folders.dist),
    assets : path.join(config.folders.dist, config.folders.assets),
    html : path.join(config.folders.dist),
    js : path.join(config.folders.dist, config.folders.assets, 'js'),
    jsConcat : path.join(config.folders.dist, config.folders.assets, 'js'),
    fonts : path.join(config.folders.dist, config.folders.assets, 'fonts'),
    media : path.join(config.folders.dist, config.folders.assets, 'media'),
    css : path.join(config.folders.dist, config.folders.assets, 'css'),
    img : path.join(config.folders.dist, config.folders.assets, 'img'),
    plugins : path.join(config.folders.dist, config.folders.assets, config.folders.plugins),
    revolution : path.join(config.folders.dist, config.folders.assets, config.folders.plugins, 'revolution')
};

var themeOptions = {
    primaryColor: argv.color || config.primaryColor,
    shineColor: argv.shine || config.shine,
    headerClass: argv.header || config.headerClass,
    navbarClass: argv.navbar || config.navbarClass,
    navbarMode: argv.navbarMode || config.navbarMode
};

var targets = {
    dist : {
        environment: 'dist',
        data: {
            assets: config.folders.assets,
            primaryColor: themeOptions.primaryColor + '-' + themeOptions.shineColor,
            headerClass: themeOptions.headerClass,
            navbarClass: themeOptions.navbarClass
        },
    },
    navbar : {
        environment: 'navbar',
        data: {
            assets: config.folders.assets,
            primaryColor: themeOptions.primaryColor + '-' + themeOptions.shineColor,
            headerClass: themeOptions.headerClass,
            navbarClass: themeOptions.navbarClass + ' navbar-mode'
        },
    },
    demo : {
        environment: 'demo',
        data: {
            assets: config.folders.assets,
            primaryColor: themeOptions.primaryColor + '-' + themeOptions.shineColor,
            headerClass: themeOptions.headerClass,
            navbarClass: themeOptions.navbarClass
        },
    },
    dev : {
        environment: 'dev',
        data: {
            assets: config.folders.assets,
            primaryColor: themeOptions.primaryColor + '-' + themeOptions.shineColor,
            headerClass: themeOptions.headerClass,
            navbarClass: themeOptions.navbarClass
        },
    },
};

gulp.task('plugins', function() {
    gulp.src(config.plugins.js)
        .pipe(gulp.dest(paths.js));

    gulp.src(config.plugins.jsConcat)
        .pipe(gulpif(config.concat, concat('plugins.min.js')))
        .pipe(gulpif(config.concat, uglify()))
        .pipe(gulp.dest(paths.jsConcat));

    gulp.src(config.plugins.css)
        .pipe(gulpif(config.concat, concat('plugins.min.css')))
        .pipe(gulp.dest(paths.css));

    gulp.src(config.plugins.fonts)
        .pipe(gulp.dest(paths.fonts));

    gulp.src(config.plugins.img)
        .pipe(gulp.dest(paths.img));
});

gulp.task('revolution', function() {
    gulp.src([
        './plugins/slider-revolution/revolution/**/*',
        './plugins/slider-revolution/revolution-addons/**/*',
        './plugins/slider-revolution/assets/**/*'],
        {base: './plugins/slider-revolution/'})
        .pipe(gulp.dest(paths.revolution));
});

gulp.task('html', function() {
    gulp.src(['src/html/**/*.html', '!src/html/layout/**/*'])
        .pipe(changed(path.join(paths.html)))
        .pipe(processhtml({
            recursive: true,
            process: true,
            strip: true,
            environment: targets[config.environment].environment,
            data: targets[config.environment].data,
            customBlockTypes: ['gulp/components-menu.js']
        }))
        .pipe(gulpif(config.compress, prettify({indent_size: 2})))
        .pipe(gulp.dest(path.join(paths.html)))
        .pipe(connect.reload());
});

gulp.task('html:dist', function() {
    gulp.src(['src/html/**/*.html', '!src/html/layout/**/*'])
        .pipe(processhtml({
            recursive: true,
            process: true,
            strip: true,
            environment: targets[config.environment].environment,
            data: targets[config.environment].data,
            customBlockTypes: ['gulp/components-menu.js']
        }))
        .pipe(gulpif(config.compress, prettify({indent_size: 2})))
        .pipe(gulp.dest(path.join(paths.html)))
        .pipe(connect.reload());
});

gulp.task('html:release', function() {
    for (var h in config.headers) {
        targets.dist.data.headerClass = 'ms-' + config.headers[h];

        for (var n in config.navbars) {
            targets.dist.data.navbarClass = 'ms-' + config.navbars[n];
            gulp.src(['src/html/**/*.html', '!src/html/layout/**/*'])
                .pipe(processhtml({
                    recursive: true,
                    process: true,
                    strip: true,
                    environment: targets[config.environment].environment,
                    data: targets[config.environment].data,
                    customBlockTypes: ['gulp/components-menu.js']
                }))
                .pipe(prettify({indent_size: 2}))
                .pipe(gulp.dest(paths.html + '/' + config.headers[h] + '-' + config.navbars[n]))
                .pipe(connect.reload());
        }
    }

    for (var nav in config.navbars) {
        config.environment = 'navbar';
        targets.navbar.data.navbarClass = 'ms-' + config.navbars[nav] + ' navbar-mode';
        gulp.src(['src/html/**/*.html', '!src/html/layout/**/*'])
            .pipe(processhtml({
                recursive: true,
                process: true,
                strip: true,
                environment: targets[config.environment].environment,
                data: targets[config.environment].data,
                customBlockTypes: ['gulp/components-menu.js']
            }))
            .pipe(prettify({indent_size: 2}))
            .pipe(gulp.dest(path.join(paths.html, config.navbars[nav])))
            .pipe(connect.reload());
    }
});

gulp.task('js', function() {
    gulp.src(['src/js/**/*.js', '!src/js/configurator.js', '!src/js/pages/**/*'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulpif(config.compress, concat('app.min.js')))
        .pipe(gulpif(config.compress, uglify()))
        .pipe(gulp.dest(paths.js))
        .pipe(connect.reload());
    gulp.src('src/js/configurator.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulpif(config.compress, concat('configurator.min.js')))
        .pipe(gulpif(config.compress, uglify()))
        .pipe(gulp.dest(paths.js))
        .pipe(connect.reload());
    gulp.src('src/js/pages/**/*')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulpif(config.compress, uglify()))
        .pipe(gulp.dest(paths.js))
        .pipe(connect.reload());
});


gulp.task('themes', function(cb) {
    var out = [];
    for (var color in config.themes) {
        for (var shine in config.shines) {
            var color_light = Number(config.shines[shine]) - 100;
            var color_dark = Number(config.shines[shine]) + 100;
            out.push(gulp.src(['src/scss/_config.scss'])
                .pipe(replace('light-blue-400', 'change400'))
                .pipe(replace('light-blue-500', 'change500'))
                .pipe(replace('light-blue-600', 'change600'))
                .pipe(replace('change400', config.themes[color] + '-' + color_light.toString()))
                .pipe(replace('change500', config.themes[color] + '-' + config.shines[shine]))
                .pipe(replace('change600', config.themes[color] + '-' + color_dark.toString()))
                .pipe(replace(' !default', ''))
                .pipe(rename('_' + config.themes[color] + '-' + config.shines[shine] + '.scss'))
                .pipe(gulp.dest('src/scss/themes')));
        }
    }
    return merge(out);
});

function generateNames() {
    var result = [];
    for (var color in config.themes) {
        for (var shine in config.shines) {
            result.push('' + config.themes[color] + '-' + config.shines[shine]);
        }
    }
    return result;
}

gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss').pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('scss', function () {
  gulp.src('src/scss/**/*.scss')
    .pipe(gulpif(config.allColors, sassThemes('src/scss/themes/_*.scss', generateNames())))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(config.compress, please({
        "autoprefixer": true,
        "filters": true,
        "rem": true,
        "opacity": true
    })))
    .pipe(gulpif(config.compress, rename({
        suffix: '.min',
        extname: '.css'
    })))
    //.pipe(gulpif(!config.compress, rename('style.' + config.defaultTheme + '.min.css')))
    .pipe(gulp.dest(paths.css))
    .pipe(connect.reload());
});

gulp.task('css-beautify', function() {
    gulp.src(path.join(paths.css, '/**/*.css'))
        .pipe(cssbeautify())
        .pipe(ext_replace('.css', '.min.css'))
        .pipe(gulp.dest('uncompressed/css/'));
});

gulp.task('js-beautify', function() {
    gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('uncompressed/js/'));
});

gulp.task('img', function() {
    gulp.src('src/img/**/*')
        .pipe(gulpif(config.compress, imagemin()))
        .pipe(gulp.dest(paths.img))
        .pipe(connect.reload());
});

gulp.task('fonts', function() {
    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest(paths.fonts))
        .pipe(connect.reload());
});

gulp.task('media', function() {
    gulp.src('src/media/**/*')
        .pipe(gulp.dest(paths.media))
        .pipe(connect.reload());
});

gulp.task('clean', function() {
    return del.sync([
        paths.dist,
        'src/scss/themes/*',
        'uncompressed'
    ]);
});

gulp.task('watch', function () {
    gulp.watch(['src/html/**/*'], ['html']);
    gulp.watch(['src/html/layout/**/*'], ['html:dist']);
    gulp.watch(['src/js/**/*'], ['js']);
    gulp.watch(['src/scss/**/*'], ['scss', 'sass']);
    gulp.watch(['src/img/**/*'], ['img']);
    gulp.watch(['src/fonts/**/*'], ['fonts']);
    gulp.watch(['src/media/**/*'], ['media']);
});

gulp.task('connect', function() {
    connect.server({
        root: config.folders.dist,
        livereload: true
    });
});

gulp.task('default', function() {
    runSequence(
        ['connect', 'sass']
    );
});


gulp.task('dist', function() {
    config.compress = true;
    config.environment = 'dist';
    config.allColors = true;

    config.themes = [themeOptions.primaryColor];
    config.shines = [themeOptions.shineColor];


    if(themeOptions.navbarMode) {
        config.environment = 'navbar';
    }

    runSequence(
        'clean',
        'themes',
        ['plugins', 'html:dist', 'js', 'scss', 'img', 'fonts', 'media', 'revolution']
    );
});

gulp.task('demo', function() {
    config.allColors = true;
    config.compress = true;
    config.environment = 'demo';

    runSequence(
        'clean',
        'themes',
        ['plugins', 'html', 'js', 'scss', 'img', 'fonts', 'media', 'revolution']
    );
});

gulp.task('dev', function() {
    config.environment = 'dev';

    runSequence(
        'clean',
        ['plugins', 'html', 'js', 'scss', 'img', 'fonts', 'media', 'revolution']
    );
});

gulp.task('work', function() {
    runSequence(
        'dev',
        ['connect', 'watch']
    );
});

gulp.task('release', function() {
    config.allColors = true;
    config.compress = true;
    config.environment = 'dist';

    runSequence(
        'clean',
        'themes',
        ['plugins', 'html:release', 'js', 'scss', 'img', 'fonts', 'media', 'revolution']
    );
});


gulp.task('uncompressed', ['css-beautify', 'js-beautify']);

gulp.task('default', ['html', 'connect', 'watch', 'sass', 'scss']);