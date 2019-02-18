const express = require('express')
const passport = require('passport')
const {
  user,
} = require('server/socket')
const router = new express.Router()
module.exports = router

const mediumLogin = passport.authenticate('medium', {
  scope: ['basicProfile'],
})
router.get('/callback', mediumLogin, user.signup)
router.post('/', mediumLogin)
