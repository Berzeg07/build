var gulp = require('gulp'),
    pug = require('gulp-pug'),
    browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    stylus = require('gulp-stylus'),
    cache = require('gulp-cache'),
    spritesmith = require("gulp.spritesmith"),
    plumber = require("gulp-plumber"),
    notify = require("gulp-notify"),
    newer = require("gulp-newer"),
    autoprefixer = require('gulp-autoprefixer');

// Работа со Stylus
gulp.task('stylus', function() {
    return gulp.src([
            'dev/stylus/main.styl',
        ])
        .pipe(plumber())
        .pipe(stylus({
            'include css': true,
            // compress: true минификация, не забываем ставить запятую выше
        }))


    .on("error", notify.onError(function(error) {
            return "Message to the notifier: " + error.message;
        }))
        .pipe(autoprefixer(['last 5 version']))
        .pipe(gulp.dest('dev/css'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

// Работа с Pug
gulp.task('pug', function() {
    return gulp.src('dev/pug/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
            // написать false если хотим минифицировать html
        }))
        .on("error", notify.onError(function(error) {
            return "Message to the notifier: " + error.message;
        }))
        .pipe(gulp.dest('dev'));
});

// Browsersync
gulp.task('browsersync', function() {
    browsersync({
        server: {
            baseDir: 'dev'
        },
    });
});

// Работа с JS
gulp.task('scripts', function() {
    return gulp.src([
            // Библиотеки
            'dev/libs/magnific/jquery.magnific-popup.min.js',
            'dev/libs/maskedinput/maskedinput.js',
            'dev/libs/owl.carousel/owl.carousel.js',
            'dev/libs/validate/jquery.validate.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dev/js'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

// Сборка спрайтов PNG
// gulp.task('cleansprite', function() {
//     return del.sync('dev/img/sprite/sprite.png');
// });

// gulp.task('spritemade', function() {
//     var spriteData =
//         gulp.src('dev/img/sprite/*.*')
//         .pipe(spritesmith({
//             imgName: 'sprite.png',
//             cssName: '_sprite.styl',
//             padding: 15,
//             cssFormat: 'stylus',
//             algorithm: 'binary-tree',
//             cssTemplate: 'stylus.template.mustache',
//             cssVarMap: function(sprite) {
//                 sprite.name = 's-' + sprite.name;
//             }
//         }));

//     spriteData.img.pipe(gulp.dest('dev/img/sprite/')); // путь, куда сохраняем картинку
//     spriteData.css.pipe(gulp.dest('dev/stylus/')); // путь, куда сохраняем стили
// });
// gulp.task('sprite', ['cleansprite', 'spritemade']);

// Слежение
gulp.task('watch', ['browsersync', 'stylus', 'scripts'], function() {
    gulp.watch('dev/stylus/**/*.styl', ['stylus']);
    gulp.watch('dev/pug/**/*.pug', ['pug']);
    gulp.watch('dev/*.html', browsersync.reload);
    gulp.watch(['dev/js/*.js', '!dev/js/libs.min.js', '!dev/js/jquery.js'], ['scripts']);
});

// Очистка папки сборки
gulp.task('clean', function() {
    return del.sync('product');
});

// Оптимизация изображений
gulp.task('img', function() {
    return gulp.src(['dev/img/**/*', '!dev/img/sprite/*'])
        .pipe(cache(imagemin({
            progressive: true,
            use: [pngquant()]

        })))
        .pipe(gulp.dest('product/img'));
});

// Сборка проекта c папкой static

// gulp.task('build', ['clean', 'img', 'stylus', 'scripts'], function() {
//     var buildCss = gulp.src('dev/static/css/*.css')
//         .pipe(gulp.dest('product/static/css'));

//     var buildFonts = gulp.src('dev/static/fonts/**/*')
//         .pipe(gulp.dest('product/static/fonts'));

//     var buildJs = gulp.src('dev/static/js/**.js')
//         .pipe(gulp.dest('product/static/js'));

//     var buildHtml = gulp.src('dev/*.html')
//         .pipe(gulp.dest('product/'));

//     var buildImg = gulp.src('dev/static/img/sprite/sprite.png')
//         .pipe(imagemin({
//             progressive: true,
//             use: [pngquant()]
//         }))
//         .pipe(gulp.dest('product/static/img/sprite/'));
// });

// Сборка без папки static

gulp.task('build', ['clean', 'img', 'stylus', 'scripts'], function() {
    var buildCss = gulp.src('dev/css/*.css')
        .pipe(gulp.dest('product/css'));

    var buildFonts = gulp.src('dev/fonts/**/*')
        .pipe(gulp.dest('product/fonts'));

    var buildJs = gulp.src('dev/js/**.js')
        .pipe(gulp.dest('product/js'));

    var buildHtml = gulp.src('dev/*.html')
        .pipe(gulp.dest('product/'));

    var buildImg = gulp.src('dev/img/sprite/sprite.png')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('product/img/sprite/'));
});

// Очистка кеша
gulp.task('clear', function() {
    return cache.clearAll();
});

// Дефолтный таск
gulp.task('default', ['watch']);
