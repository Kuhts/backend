const express = require('express')
const router = new express.Router()
const {
  user,
} = require('db/queries')

module.exports = router

router.get('/user/', (req, res, next) => user.findOne(req.body).then((data) => {
  res.json(user.publicize(data))
}))
