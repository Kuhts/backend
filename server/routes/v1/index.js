const express = require('express')
const router = express.Router()
const authRouter = require('server/routes/v1/auth')
const privateRouter = require('server/routes/v1/private')

module.exports = router

// router.use((req, res, next) => console.log(req.session, req.user) || next())
router.use('/auth', authRouter)
router.use('/api', authenticate, privateRouter)

function authenticate(req, res, next) {
  const authed = req.isAuthenticated()
  if (authed) {
    next()
  } else {
    res.boom.unauthorized()
  }
}
