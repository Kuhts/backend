const facebook = require('server/routes/v1/auth/facebook')
const github = require('server/routes/v1/auth/github')
const google = require('server/routes/v1/auth/google')
const local = require('server/routes/v1/auth/local')
const medium = require('server/routes/v1/auth/medium')
const reddit = require('server/routes/v1/auth/reddit')
const twitter = require('server/routes/v1/auth/twitter')
const functions = require('server/functions')
const {
  user,
} = require('db/queries')

const express = require('express')
const router = express.Router()

module.exports = router

router.get('/:id/detach', (req, res, next) => {
  const { params, user: usr, } = req
  const { id, } = params
  return user.removeProvider(usr, id).then(() => {
    res.json({
      data: {
        container: 'user',
        path: ['providers', id],
        value: null,
      },
    })
  }).catch(({
    message,
  }) => res.boom.unauthorized(message))
})
// router.use('/twitter', twitter)
router.use('/facebook', facebook)
router.use('/github', github)
router.use('/google', google)
router.use('/medium', medium)
router.use('/reddit', reddit)
// router.use('/local', local)
router.get('/check', (req, res, next) => {
  const { user, } = req
  if (user) {
    return res.json(user)
  } else {
    return res.boom.unauthorized()
  }
})
router.get('/logout', (req, res) => {
  req.logout()
  res.json({})
});
