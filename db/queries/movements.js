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
    .update(assign(data))
    .where({
      id,
    })
    .returning('*')
    .then((docs) => docs[0])
}

function create(user_id, doc) {
  const id = uuid.v4()
  const pathname = doc.pathname || id
  const docu = assign({}, doc, {
    id,
    pathname,
    user_id,
  })
  return table()
    .insert(docu)
    .returning('*')
    .then((docs) => docs[0])
}

async function table() {
  return connection('movements')
}

function joinedMovements(moreUserData = {}) {
  return table()
    .join('users', 'movements.user_id', 'users.id')
    .select(assign({}, defaultUserData, moreUserData))
}

function selection(method, columns, moreUserData) {
  return joinedMovements(moreUserData)[method](...columns)
}

function get(where, columns, moreUserData) {
  return selection('first', columns, moreUserData).where(where)
}

function getMany(where, columns, moreUserData) {
  return selection('select', columns, moreUserData).where(where)
}

function count(select) {
  return table()
    .where(select)
    .countDistinct('id')
}
