var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ExampleModel = require('../models/diet')

var packageSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
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


{
                id:1,
                image:'gallery_list-1.jpg',
                name:'Vafankulo',
                description:'This format perfectly fits in case you need only a single image for your post display. Use Featured image option to add image to the post.',
                homeImagePath:'',
                previewImagePath:'images/gallery_list-1.jpg',
                pageImagePath:'',
                dates:{
                    start:'Mon Aug 28 2017 18:07:04 GMT+0300 (EEST)',
                    end:'Tue Aug 29 2017 18:07:04 GMT+0300 (EEST)',
                }
            },