const express = require('express')
const router = new express.Router()
const passport = require('passport')
module.exports = router

const localAuth = passport.authenticate('local')

router.post('/register', (req, res, next) => {
  user.create(req.body)
    .then(() => next())
    .catch(next)
}, localAuth, (req, res, next) => {
  if (!req.user) {
    next(new Error('no user'))
  } else {
    res.json(req.user)
  }
})

router.get('/login', localAuth, (req, res, next) => {
  if (!req.user) {
    next(new Error('no user'))
  } else {
    res.json(req.user)
  }
})
