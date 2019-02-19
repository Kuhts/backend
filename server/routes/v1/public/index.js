const express = require('express')
const router = new express.Router()
const {
  users,
} = require('db/queries')

module.exports = router


router.get('/wake-up', (req, res) => res.send('👍'))
router.get('/user/', (req, res, next) => users.findOne(req.body).then((data) => {
  res.json(users.publicize(data))
}))
