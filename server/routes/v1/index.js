const express = require('express')
const router = express.Router()
const authRouter = require('server/routes/v1/auth')
const privateRouter = require('server/routes/v1/private')
const publicRouter = require('server/routes/v1/public')

module.exports = router

router.use('/auth', authRouter)
router.use('/api', publicRouter, authenticate, privateRouter)

function authenticate(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.boom.unauthorized()
  }
}
