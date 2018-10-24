const express = require('express')
const passport = require('passport')
const {
  user,
} = require('server/socket')
const { auth, } = require('server/helpers')
const router = new express.Router()
module.exports = router

const githubAuth = passport.authenticate('github')
router.use('/callback', githubAuth, user)
router.use(auth.transferSocketId)
router.use('/', githubAuth)
