const express = require('express')
const router = new express.Router()
module.exports = router

const {
  workouts,
} = require('server/functions')

router.post('/', workouts.create)
router.put('/:id', workouts.write)
router.get('/:id', workouts.get)
router.get('/', workouts.getMany)
