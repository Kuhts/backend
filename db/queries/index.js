const user = require('db/queries/user')
const documents = require('db/queries/documents')
const movements = require('db/queries/movements')

const {
  connection,
} = require('db')

module.exports = {
  user,
  documents,
  movements,
}
