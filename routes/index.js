var express = require('express');
var router = express.Router();
var path = require('path');
var Pics = require('../models').Pics;
var zipFolder = require('zip-folder');


// require the image editing file
var editor = path.resolve(__dirname, '../editor.js');
var dirShit = path.resolve(__dirname, '../public/zips');
var zipname;
function compressAndResize (imageUrl, response) {
  zipname = imageUrl.slice(22).replace(/\.\w+/, ".zip");
  // We need to spawn a child process so that we do not block 
  // the EventLoop with cpu intensive image manipulation 
  var childProcess = require('child_process').fork(editor);
  childProcess.on('message', function(message) {
    console.log(message);
  });
  childProcess.on('error', function(error) {
    console.error(error.stack)
  });
  childProcess.on('exit', function() {
    // var zip = new AdmZip();
    
    console.log('process exited');

    zipFolder('public/images/'+imageUrl.slice(22,54), dirShit + '/' + zipname, function(err){
      if(err) console.log('oh no!', err);
      else response.redirect('/');
    })
  });
  childProcess.send(imageUrl);
}

var photos;
/* GET home page. */
router.get('/', function(req, res, next) {
  var zipPath = 'zips/' + zipname;
  Pics.find({}, function(err, pics){
    pics.forEach(function(pic){
      var path = 'images/'+pic.file_name.slice(0,32)+'/';
      // no need to add /public because of static
      photos = [path + pic.file_300, path + pic.file_336, path + pic.file_728 , path + pic.file_600, path + pic.file_320];
    })
    res.render('index', { title: 'Image Re-Sizer', pictures: photos, download: zipPath}); 
  })
});

router.post('/upload', function(req, res, next) {
  var file300 = req.files.image_url.name.replace(/\./, "300.");
  var file336 = req.files.image_url.name.replace(/\./, "336.");
  var file728 = req.files.image_url.name.replace(/\./, "728.");
  var file600 = req.files.image_url.name.replace(/\./, "600.");
  var file320 = req.files.image_url.name.replace(/\./, "320.");

  if (req.files.image_url) {
    var newPic = new Pics({
      file_name: req.files.image_url.name,
      file_path: req.files.image_url.path,
      file_300: file300,
      file_336: file336,
      file_728: file728,
      file_600: file600,
      file_320: file320
    });
    // multer automatically saves it to /uploads on upload so we need to get that pic from that directory
    // and apply the compressandResize function on it
    newPic.save(compressAndResize('public/images/uploads/' + req.files.image_url.name, res));
  }
});

module.exports = router;