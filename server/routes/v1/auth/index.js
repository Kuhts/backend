const facebook = require('server/routes/v1/auth/facebook')
const github = require('server/routes/v1/auth/github')
const google = require('server/routes/v1/auth/google')
const local = require('server/routes/v1/auth/local')
const twitter = require('server/routes/v1/auth/twitter')
const functions = require('server/functions')

const {
  user,
} = require('db/queries')

const express = require('express')
const router = express.Router()

module.exports = router

// router.use('/twitter', twitter)
router.use('/facebook', facebook)
router.use('/github', github)
router.use('/google', google)
// router.use('/local', local)
router.get('/:id/detach', (req, res, next) => {
  const { params, session, } = req
  const { id, } = params
  user.removeProvider(req.user, id)
    .then(() => {
      req.app.get('io')
        .in(session.socketId)
        .emit('update', {
          container: 'user',
          path: ['providers', id],
          value: null,
        })
      res.send({})
    })
})
router.get('/check', (req, res, next) => {
  if (!req.user) {
    return res.boom.unauthorized()
  }
  user.getByProvider(req.user).then((result) => (
    res.json(user.sterilize(result))
  ))
})
router.get('/logout', (req, res) => {
  req.logout()
  res.json({})
});

