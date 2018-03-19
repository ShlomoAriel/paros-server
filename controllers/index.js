var express = require('express')
  , router = express.Router()

router.use('/', require('./contentController'))

module.exports = router