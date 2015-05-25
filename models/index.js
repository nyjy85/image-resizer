var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/image_resizer');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error'));

var Pics;

var picSchema = new mongoose.Schema({
	file_name: String,
	file_path: String,
	file_320: String,
	file_120: String,
	file_48: String
});

Pics = mongoose.model('Pics', picSchema);

module.exports = {Pics: Pics};