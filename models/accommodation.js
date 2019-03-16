var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ExampleModel = require('../models/diet')

var accommodationSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    images: { type: String, required: false },
    language: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    dateCreated: { type: Date, required: false},
    dateModified: { type: Date, required: false},
});

accommodationSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.

    // ExampleModel.remove({accommodation: this._id}).exec();
    next();
});
var Accommodation = mongoose.model('Accommodation', accommodationSchema);
module.exports = Accommodation;