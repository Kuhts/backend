const express = require('express')
const passport = require('passport')
const {
  user,
} = require('server/socket')
const router = new express.Router()
const { auth, } = require('server/helpers')
module.exports = router

const googleAuth = passport.authenticate('google', {
  scope: ['profile']
})
router.get('/callback', googleAuth, user)
router.use(auth.transferSocketId)
router.get('/', googleAuth)
