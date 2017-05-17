const gulp = require('gulp');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');

// var minifyCSS = require('gulp-csso');

// gulp.task('html', function(){
//   return gulp.src('client/templates/*.pug')
//     .pipe(pug())
//     .pipe(gulp.dest('build/html'))
// });

gulp.task('compress-css', () => {
  return gulp.src('./public/src/css/main.styl')
    .pipe(stylus({
      compress: true
    }))
    .on('error', (err) => {
      console.log(err)
    })
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .on('error', (err) => {
      console.log(err)
    })
    .pipe(gulp.dest('./public/dist/css'))
    .pipe(livereload());
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('./public/src/css/**/*.styl', ['css']);
});

gulp.task('css', ['compress-css']);

gulp.task('build', ['css'])

gulp.task('default', ['build', 'watch']);