const _ = require('lodash')
const express = require('express')
const router = new express.Router()
module.exports = router

router.put('/', (req, res) => {
  const { user, body, } = req
  return queries.user.update(user.id, body)
  .then((json) => {
    return res.json(subset(body, json))
  }).catch((errors) => res.boom.badData({ errors, }))
})

router.get('/secret', (req, res) => {
  res.json(req.user)
})

function subset(ask, user) {
  return _.mapValues(ask, (v, key) => user[key])
}
