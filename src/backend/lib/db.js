var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/mockserver');
var Schema = mongoose.Schema;

var seviceScheMa = new Schema({
    path: String,
    result: String
});

exports.services = db.model('services', seviceScheMa);