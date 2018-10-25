const express = require('express')
const passport = require('passport')
const {
  user,
} = require('server/socket')
const { auth, } = require('server/helpers')
const router = new express.Router()
module.exports = router

const twitterLogin = passport.authenticate('twitter')
router.use('/callback', twitterLogin, user.signup)
router.use('/', twitterLogin)
