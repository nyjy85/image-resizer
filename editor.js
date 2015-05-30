var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");

function processImg (filesrc) {
  console.log('FILESRC BT', filesrc)
 return gulp.src(filesrc)

  // compress and save
  .pipe(imagemin({optimizationLevel: 5}))
  // .pipe(gulp.dest('public/images/og'))
  .pipe(gulp.dest('public/images/'+filesrc.slice(22, 54)))
  // save 300 x 200
  .pipe(imageResize({
    width: 300,
    height: 200
    // crop: true
  }))
  .pipe(rename(filesrc.slice(22).replace(/\./, "320.")))
  // .pipe(gulp.dest('public/images/320'))
  .pipe(gulp.dest('public/images/'+filesrc.slice(22, 54)))
  // save 120 x 120
  .pipe(imageResize({
    width: 120,
    height: 120
    // crop: true
  }))
  .pipe(rename(filesrc.slice(22).replace(/\./, "120.")))
  // .pipe(gulp.dest('public/images/120'))
  .pipe(gulp.dest('public/images/'+filesrc.slice(22, 54)))
  // save 48 x 48
  .pipe(imageResize({
    width: 48,
    height: 48
    // crop: true
  }))
  .pipe(rename(filesrc.slice(22).replace(/\./, "48.")))
  .pipe(gulp.dest('public/images/'+filesrc.slice(22, 54)))
  // .pipe(gulp.dest('public/images/48'));
}

process.on('message', function (images) {
  console.log('Image processing started...');
  var stream = processImg(images);

  stream.on('end', function () {
    process.send('Image processing complete');
    process.exit();
  });
  stream.on('error', function (err) {
    process.send(err);
    process.exit(1);
  });
});
module.exports = {};