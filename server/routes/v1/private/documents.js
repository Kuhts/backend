const express = require('express')
const router = new express.Router()
module.exports = router

const {
  documents,
} = require('server/functions')

router.post('/', documents.create)
router.put('/:id', documents.write)
router.get('/:id', documents.get)
router.get('/', documents.getMany)
