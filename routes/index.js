var express = require('express');
var router = express.Router();
var path = require('path');
var Pics = require('../models').Pics;
var zipFolder = require('zip-folder');


// require the image editing file
var editor = path.resolve(__dirname, '../editor.js');
var dirShit = path.resolve(__dirname, '../public/zips');
var zipname;
function compressAndResize (imageUrl, response, file320, file120, file48) {
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
      photos = [path + pic.file_120, path + pic.file_320, path + pic.file_48];
    })
    res.render('index', { title: 'Image Re-Sizer', pictures: photos, download: zipPath}); 
  })
});

router.post('/upload', function(req, res, next) {
  var file320 = req.files.image_url.name.replace(/\./, "320.");
  var file120 = req.files.image_url.name.replace(/\./, "120.");
  var file48 = req.files.image_url.name.replace(/\./, "48.");

  if (req.files.image_url) {
    var newPic = new Pics({
      file_name: req.files.image_url.name,
      file_path: req.files.image_url.path,
      file_320: file320, 
      file_120: file120, 
      file_48: file48
    });
    // multer automatically saves it to /uploads on upload so we need to get that pic from that directory
    // and apply the compressandResize function on it
    newPic.save(compressAndResize('public/images/uploads/' + req.files.image_url.name, res, file320, file120, file48));
  }
});

module.exports = router;