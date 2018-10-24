const express = require('express')
const passport = require('passport')
const {
  user,
} = require('server/socket')
const router = new express.Router()
const { auth, } = require('server/helpers')
module.exports = router

const twitterAuth = passport.authenticate('twitter')
router.get('/callback', twitterAuth, user)
router.use(auth.transferSocketId)
router.get('/', twitterAuth)
