var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
// var rename = require("gulp-rename");
var responsive = require('gulp-responsive');

function processImg (filesrc) {
  console.log('FILESRC BT', filesrc)
 return gulp.src(filesrc)

  // compress and save
  .pipe(imagemin({optimizationLevel: 5}))
 
  .pipe(responsive({
    name: '*.png',
    width: 300,
    height: 250,
    rename: filesrc.slice(22).replace(/\./, "300.")
    // crop: true
  }, {
    strictMatchImages: false
  }))
  .pipe(gulp.dest('public/images/'+filesrc.slice(22, 54)))
  // save 120 x 120
  .pipe(responsive({
    name: '*.png',
    width: 336,
    height: 280,
    rename: filesrc.slice(22).replace(/\./, "336.")
    // crop: true
  }, {
    strictMatchImages: false
  }))
  .pipe(gulp.dest('public/images/'+filesrc.slice(22, 54)))

  .pipe(responsive({
    name: '*.png',
    width: 728,
    height: 90,
    rename: filesrc.slice(22).replace(/\./, "728.")
    // crop: true
  },{
    strictMatchImages: false
  }))
  .pipe(gulp.dest('public/images/'+filesrc.slice(22, 54)))
  
  .pipe(responsive({
    name: '*.png',
    width: 300,
    height: 600,
    rename: filesrc.slice(22).replace(/\./, "600.")
    // crop: true
  }, {
    strictMatchImages: false
  }))
  .pipe(gulp.dest('public/images/'+filesrc.slice(22, 54)))
  
  .pipe(responsive({
    name: '*.png',
    width: 320,
    height: 180,
    rename: filesrc.slice(22).replace(/\./, "320.")
    // crop: true
  }, {
    strictMatchImages: false
  }))
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