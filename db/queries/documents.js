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
  getMany,
  write,
}

module.exports = documents

function write(id, contents) {
  return docs()
    .update({
      contents: JSON.stringify(contents),
    })
    .where({
      id,
    })
    .returning('*')
    .then(([doc]) => doc)
}

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

function docs() {
  return connection('documents')
}

function joinedDocuments() {
  return docs()
    .join('users', 'documents.userId', '=', 'users.id')
    .select({
      author: 'users.username',
    })
}

function selection(method, columns) {
  return joinedDocuments()[method](...columns)
}

function get(columns, where) {
  return selection('first', columns).where(where)
}

function getMany(columns, where) {
  return selection('select', columns).where(where)
}

function count(select) {
  return connection('documents')
    .where(select)
    .countDistinct('id')
}
