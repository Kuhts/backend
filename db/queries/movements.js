const uuid = require('uuid')
const {
  assign,
} = require('lodash')
const {
  connection,
} = require('db')
const generics = require('db/queries/generics')
const crud = generics('movements')

const movements = {
  update: crud.update,
  remove: crud.remove,
  count: crud.count,
  write: crud.write,
  read: crud.read,
  create,
}

module.exports = movements

function create(doc = {}) {
  const id = doc.id || uuid.v4()
  const pathname = doc.pathname || id
  const docu = assign({}, doc, {
    id,
    pathname,
  })
  return crud.create(docu)
}
