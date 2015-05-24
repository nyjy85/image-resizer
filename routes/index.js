var express = require('express');
var router = express.Router();
var path = require('path');
var Pics = require('../models').Pics;

// require the image editing file
var editor = path.resolve(__dirname, '../editor.js');
function compressAndResize (imageUrl, response) {
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
    console.log('process exited');
    response.redirect('/');
  });
  childProcess.send(imageUrl);
}
var photos;
/* GET home page. */
router.get('/', function(req, res, next) {
	Pics.find({}, function(err, pics){
		
		pics.forEach(function(pic){
			// no need to add /public because of static
			photos = ['images/120/' + pic.file_name, 'images/320/' + pic.file_name, 'images/48/' + pic.file_name];
		})
		res.render('index', { title: 'Express', pictures: photos}); 
	})
	 
});

router.post('/upload', function(req, res, next) {
  if (req.files.image_url) {
  	var newPic = new Pics({
  		file_name: req.files.image_url.name,
  		file_path: req.files.image_url.path
  	});
  	// multer automatically saves it to /uploads on upload so we need to get that pic from that directory
  	// and apply the compressandResize function on it
  	newPic.save(compressAndResize('public/images/uploads/' + req.files.image_url.name, res));
  }
  
});

module.exports = router;



