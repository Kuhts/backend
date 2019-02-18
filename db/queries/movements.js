const uuid = require('uuid')
const {
  assign,
} = require('lodash')
const {
  connection,
} = require('db')

const movements = {
  create,
  get,
  count,
  getMany,
  write,
}

module.exports = movements

function write(id, data) {
  return table()
    .update(Object.assign(data))
    .where({
      id,
    })
    .returning('*')
    .then((docs) => docs[0])
}

function create(userId, doc) {
  const id = uuid.v4()
  const pathname = doc.pathname || id
  const docu = assign({
    id,
    pathname,
    userId,
  }, doc)
  return table()
    .insert(docu)
    .returning('*')
    .then((docs) => docs[0])
}

function table() {
  return connection('movements')
}

function joinedMovements() {
  return table()
    .join('users', 'movements.userId', '=', 'users.id')
    .select({
      author: 'users.username',
    })
}

function selection(method, columns) {
  return joinedMovements()[method](...columns)
}

function get(columns, where) {
  return selection('first', columns).where(where)
}

function getMany(columns, where) {
  return selection('select', columns).where(where)
}

function count(select) {
  return table()
    .where(select)
    .countDistinct('id')
}
