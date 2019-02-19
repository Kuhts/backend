const express = require('express')
const v1 = require('server/routes/v1')
const router = express.Router()
module.exports = router

router.use('/v1', v1)
