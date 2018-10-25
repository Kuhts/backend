const express = require('express')
const passport = require('passport')
const {
  user,
} = require('server/socket')
const { auth, } = require('server/helpers')
const router = new express.Router()
module.exports = router

const facebookLogin = passport.authenticate('facebook')
router.use('/callback', facebookLogin, user.signup)
router.use('/', facebookLogin)
