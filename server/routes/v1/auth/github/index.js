const express = require('express')
const passport = require('passport')
const {
  user,
} = require('server/socket')
const router = new express.Router()
module.exports = router

const githubLogin = passport.authenticate('github')
router.use('/callback', githubLogin, user.signup)
router.use('/', githubLogin)
