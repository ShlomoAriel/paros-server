var express = require('express')
  , router = express.Router()
  , PackageModel = require('../models/package')
  , passport = require('passport')
  , app = express()

router.get('/api/getPackage/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    PackageModel.findOne({_id:req.params.id}).exec(function (err, package) {
        if (err) {
            res.send('find no good' + err)
        }
        else {
            res.json(package);
        }
    })    
});
//-------------------------------------------------------------------------------------------------
router.get('/api/getPackages', passport.authenticate('jwt', { session: false }), function (req, res) {
    PackageModel.find().exec(function (err, packages) {
        if (err) {
            res.send('find no good' + err);
        }
        else {
            res.json(packages);
        }
    })
});
//-------------------------------------------------------------------------------------------------
router.post('/api/addPackages', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding packages')
    PackageModel.insertMany(req.body,(err, packages) => {
        if (err) {
            return next(err.code)
        }

        res.json(packages)
    })
})
//-------------------------------------------------------------------------------------------------
router.post('/api/addPackage', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('adding package');
    var package = new PackageModel(req.body);
    package.save((err, newItem) => {
        if (err) {
            return next(err.code);
        }
        res.status(200).send('OK');
    });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/updatePackage/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    console.log('updating Package: ' + req.body.name + ' ' + req.body.value);
    PackageModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { 
            section: req.body.section,
            name: req.body.name,
            package: req.body.package,
            deleted: req.body.deleted || false,
            dateModified: Date(),
        } 
        },
        { upsert: true },
        function (err, package) {
            if (err) {
                res.send('Error updating Package\n' + err);
            }
            else {
                res.json(package)
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.delete('/api/deletePackage/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    PackageModel.findById(req.params.id, function (err, newPackage) {
            if (err) {
                res.send('Error deleting Package\n' + err);
            }
            else {
                package.remove( (err, response) =>{
                    if (err) {
                        res.send('Error deleting package\n' + err);
                    } else{
                        res.json(response)
                    }
                } )
            }
        });
});
//----------------------------------------------------------------------------------------------------
router.put('/api/upsertPackage/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    console.log('upserting Package: ' + req.body.name);
    let id = req.body._id
    if (!id) {
        var package = new PackageModel(req.body);
        package.save((err, newItem) => {
        if (err) {
            return next(err);
        }
        res.json(newItem);
    });
    } else{
        PackageModel.findOneAndUpdate(
            { _id: id},
            { $set: {
                    description: req.body.description,
                    name: req.body.name,
                    image: req.body.image,
                    start: req.body.start,
                    end: req.body.end,
                    deleted: req.body.deleted,
                    dateModified: Date()
                }
            },
            { upsert: true },
            function (err, newPackage) {
                if (err) {
                    res.send('Error upserting Package\n' + err);
                }
                else {
                    res.json(newPackage);
                }
            });
    }
});
module.exports = router
