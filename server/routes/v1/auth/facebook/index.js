const express = require('express')
const passport = require('passport')
const {
  user,
} = require('server/socket')
const { auth, } = require('server/helpers')
const router = new express.Router()
module.exports = router

const facebookAuth = passport.authenticate('facebook')
router.get('/callback', facebookAuth, user)
router.use(auth.transferSocketId)
router.get('/', facebookAuth)
