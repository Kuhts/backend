const express = require('express')
const router = new express.Router()
module.exports = router

const user = require('./user')
const workouts = require('./workouts')
router.use('/user', user)
router.use('/workouts', workouts)
