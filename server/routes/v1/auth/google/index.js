const express = require('express')
const passport = require('passport')
const {
  user,
} = require('server/socket')
const { auth, } = require('server/helpers')
const router = new express.Router()
module.exports = router

const googleLogin = passport.authenticate('google', {
  scope: ['profile']
})
router.use('/callback', googleLogin, user.signup)
router.use('/', googleLogin)
