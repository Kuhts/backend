const user = require('db/queries/user')
const documents = require('db/queries/documents')

const {
  connection,
} = require('db')

module.exports = {
  user,
  documents,
}
