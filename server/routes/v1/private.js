const _ = require('lodash')
const passport = require('passport')
const express = require('express')
const queries = require('db/queries')
const router = new express.Router()
const {
  documents,
} = require('server/functions')

module.exports = router

router.get('/secret', (req, res) => {
  res.json(req.user)
})

router.put('/user/', (req, res) => {
  const { user, body, } = req
  return queries.user.update(user.id, body)
  .then((json) => {
    return res.json(subset(body, json))
  }).catch((errors) => res.boom.badData({ errors, }))
})

router.post('/documents/', documents.create)
router.put('/documents/:id', documents.write)
router.get('/documents/:id', documents.get)
router.get('/documents/', documents.getMany)

function subset(ask, user) {
  return _.mapValues(ask, (v, key) => user[key])
}
