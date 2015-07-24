var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");
var lwip = require('gulp-lwip');

function processImg (filesrc) {
  console.log('FILESRC BT', filesrc)
 return gulp.src(filesrc)

  // compress and save
  .pipe(imagemin({optimizationLevel: 5}))
 
  .pipe(lwip
    .scale(0.5)
    .resize(300, 250)
  )
  .pipe(rename(filesrc.slice(22).replace(/\./, "300.")))
  .pipe(gulp.dest('public/images/'+filesrc.slice(22, 54)))
  // save 120 x 120
  .pipe(lwip
    .scale(0.5)
    .resize(336, 280)
  )
  .pipe(rename(filesrc.slice(22).replace(/\./, "336.")))
  .pipe(gulp.dest('public/images/'+filesrc.slice(22, 54)))

  .pipe(lwip
    .scale(0.5)
    .resize(728, 90)
  )
  .pipe(rename(filesrc.slice(22).replace(/\./, "728.")))
  .pipe(gulp.dest('public/images/'+filesrc.slice(22, 54)))
  
  .pipe(lwip
    .scale(0.5)
    .resize(300, 600)
  )
  .pipe(rename(filesrc.slice(22).replace(/\./, "600.")))
  .pipe(gulp.dest('public/images/'+filesrc.slice(22, 54)))
  
  .pipe(lwip
    .scale(0.5)
    .resize(320, 180)
  )
  .pipe(rename(filesrc.slice(22).replace(/\./, "320.")))
  .pipe(gulp.dest('public/images/'+filesrc.slice(22, 54)))
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