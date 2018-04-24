var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ExampleModel = require('../models/diet')

var packageSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    start: { type: Date, required: false },
    end: { type: Date, required: false },
    language: { type: String, required: true },
    price: { type: String, required: false },
    accommodation: { type: String, required: false },
    meals: { type: String, required: false },
    deleted: { type: Boolean, default: false },
    dateCreated: { type: Date, required: false},
    dateModified: { type: Date, required: false},
});
packageSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.

    // ExampleModel.remove({package: this._id}).exec();
    next();
});
var Package = mongoose.model('Package', packageSchema);
module.exports = Package;