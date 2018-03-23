var express = require('express')
  , router = express.Router()
  , ContentModel = require('../models/content')
  , passport = require('passport')
  , app = express()

// var contentUtils = require('../utils/contentUtils')
// app.use(passport.initialize());
// require('../config/passport')(passport);

router.get('/api/getContent/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    ContentModel.findOne({_id:req.params.id}).exec(function (err, content) {
        if (err) {
            res.send('find no good' + err)
        }
        else {
            res.json(content);
        }
    })    
});
//-------------------------------------------------------------------------------------------------
router.get('/api/getContents', passport.authenticate('jwt', { session: false }), function (req, res) {
    ContentModel.find().exec(function (err, contents) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(contents);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addContents', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding contents')
    ContentModel.insertMany(req.body,(err, contents) => {
        if (err) {
            return next(err.code)
        }

        res.json(contents)
    })
})
//-------------------------------------------------------------------------------------------------
router.post('/api/addContent', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding content');
    var content = new ContentModel(req.body);
    content.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateContent/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating Content: ' + req.body.name + ' ' + req.body.value);
    ContentModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { 
            section: req.body.section,
            name: req.body.name,
            content: req.body.content,
            deleted: req.body.deleted || false,
            dateModified: Date(),
        } 
        },
        { upsert: true },
        function (err, content) {
            if (err) {
                res.send('Error updating Content\n' + err);
            }
            else {
                res.json(content)
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteContent/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    ContentModel.findById(req.params.id, function (err, newContent) {
            if (err) {
                res.send('Error deleting Content\n' + err);
            }
            else {
                content.remove( (err, response) =>{
                    if (err) {
                        res.send('Error deleting content\n' + err);
                    } else{
                        res.json(response)
                    }
                } )
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/upsertContent/', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('upserting Content: ' + req.body.name + ' ' + req.body.content);
    let id = req.body._id
    if (!id) {
        var content = new ContentModel(req.body);
        content.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.json(newItem);
    });
    } else{
        ContentModel.findOneAndUpdate(
            { _id: id},
            { $set: {
                    section: req.body.section,
                    name: req.body.name,
                    content: req.body.content,
                    language: req.body.language,
                    deleted: req.body.deleted
                    dateModified: Date()
                }
            },
            { upsert: true },
            function (err, newContent) {
                if (err) {
                    res.send('Error upserting Content\n' + err);
                }
                else {
                    res.json(newContent);
                }
            });
    }
});
module.exports = router
