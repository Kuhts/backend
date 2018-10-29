const uuid = require('uuid')
const {
  assign,
} = require('lodash')
const {
  connection,
} = require('db')

const documents = {
  create,
  get,
  count,
}

module.exports = documents

function create(userId, doc) {
  const id = uuid.v4()
  const pathname = doc.pathname || id
  const docu = assign({
    id,
    pathname,
    userId,
  }, doc)
  return connection('documents')
    .insert(docu)
    .returning('*')
    .then(([doc]) => doc)
}

function get(columns, select) {
  return connection('documents')
    .join('users', 'documents.userId', '=', 'users.id')
    .select(...columns.map((key) => `documents.${key}`))
    .select({
      author: 'users.username',
    })
    .where(select)
}

function count(select) {
  return connection('documents')
    .where(select)
    .countDistinct('id')
}
