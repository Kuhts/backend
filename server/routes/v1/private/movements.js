const express = require('express')
const router = new express.Router()
module.exports = router

const {
  movements,
} = require('server/functions')

router.post('/', movements.create)
router.put('/:id', movements.write)
router.get('/:id', movements.get)
router.get('/', movements.getMany)
