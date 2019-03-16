var express = require('express')
  , router = express.Router()

router.use('/', require('./contentController'))
router.use('/', require('./packageController'))
router.use('/', require('./accommodationController'))

module.exports = router