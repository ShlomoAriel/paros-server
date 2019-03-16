var express = require('express')
  , router = express.Router()
  , AccommodationModel = require('../models/accommodation')
  , passport = require('passport')
  , app = express()

router.get('/api/getAccommodation/:id', function (req, res) {
    AccommodationModel.findOne({_id:req.params.id}).exec(function (err, accommodation) {
        if (err) {
            res.send('find no good' + err)
        }
        else {
            res.json(accommodation);
        }
    })    
});
//-------------------------------------------------------------------------------------------------
router.get('/api/getAccommodations', function (req, res) {
    AccommodationModel.find().exec(function (err, accommodations) {
        if (err) {
            res.send(err.code);
        }
        else {
            res.json(accommodations);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addAccommodations', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding accommodations')
    AccommodationModel.insertMany(req.body,(err, accommodations) => {
        if (err) {
            return next(err.code)
        }

        res.json(accommodations)
    })
})
//-------------------------------------------------------------------------------------------------
router.post('/api/addAccommodation', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding accommodation');
    var accommodation = new AccommodationModel(req.body);
    accommodation.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updateAccommodation/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating Accommodation: ' + req.body.name + ' ' + req.body.value);
    AccommodationModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { 
            section: req.body.section,
            name: req.body.name,
            accommodation: req.body.accommodation,
            deleted: req.body.deleted || false,
            dateModified: Date(),
        } 
        },
        { upsert: true },
        function (err, accommodation) {
            if (err) {
                res.send('Error updating Accommodation\n' + err);
            }
            else {
                res.json(accommodation)
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deleteAccommodation/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    AccommodationModel.findById(req.params.id, function (err, accommodation) {
            if (err) {
                res.send('Error deleting Accommodation\n' + err);
            }
            else {
                accommodation.remove( (err, response) =>{
                    if (err) {
                        res.send('Error deleting accommodation\n' + err);
                    } else{
                        res.json(response)
                    }
                } )
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/upsertAccommodation/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    console.log('upserting Accommodation: ' + req.body.name);
    let id = req.body._id
    if (!id) {
        var accommodation = new AccommodationModel(req.body);
        accommodation.save((err, newItem) => {
        if (err) {
            return next(err);
        }
        res.json(newItem);
    });
    } else{
        AccommodationModel.findOneAndUpdate(
            { _id: id},
            { $set: {
                    description: req.body.description,
                    name: req.body.name,
                    images: req.body.images,
                    image: req.body.image,
                    language: req.body.language,
                    deleted: req.body.deleted,
                    dateModified: Date()
                }
            },
            { upsert: true, new: true  },
            function (err, newAccommodation) {
                if (err) {
                    res.send('Error upserting Accommodation\n' + err);
                }
                else {
                    res.json(newAccommodation);
                }
            });
    }
});
module.exports = router
