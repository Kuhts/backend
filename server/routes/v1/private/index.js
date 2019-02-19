const express = require('express')
const router = new express.Router()
module.exports = router

const user = require('server/routes/v1/private/user')
const workouts = require('server/routes/v1/private/workouts')
router.use('/user', user)
router.use('/workouts', workouts)
