var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/image_resizer');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error'));

var Pics;

var picSchema = new mongoose.Schema({
	file_name: String,
	file_path: String,
	file_300: String,
	file_336: String,
	file_728: String,
	file_600: String,
	file_320: String
});

Pics = mongoose.model('Pics', picSchema);

module.exports = {Pics: Pics};