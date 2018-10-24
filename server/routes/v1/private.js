
const passport = require('passport')
const express = require('express')
const {
  user,
} = require('server/helpers')
const router = new express.Router()

module.exports = router

router.get('secret', (req, res) => {
  res.send('bougie')
})
