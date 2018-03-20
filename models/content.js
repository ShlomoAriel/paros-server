var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ExampleModel = require('../models/diet')

var contentSchema = new Schema({
    section: { type: String, required: false },
    name: { type: String, required: true },
    content: { type: String, required: false },
    language: { type: String, required: false },
    deleted: { type: Boolean, default: false },
    dateCreated: { type: Date, required: false},
    dateModified: { type: Date, required: false},
});
contentSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.

    // ExampleModel.remove({content: this._id}).exec();
    next();
});
var Content = mongoose.model('Content', contentSchema);
module.exports = Content;