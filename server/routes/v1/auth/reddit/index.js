const express = require('express')
const passport = require('passport')
const crypto = require('crypto')
const {
  user,
} = require('server/socket')
const router = new express.Router()
module.exports = router

router.use('/callback', redditLogin, user.signup)
router.use('/', redditLogin)

function redditLogin(req, res, next) {
  passport.authenticate('reddit', {
    state: crypto.randomBytes(32).toString('hex'),
  })(req, res, next)
}