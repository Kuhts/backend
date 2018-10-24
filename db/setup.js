const connection = require('./connection')
const path = require('path')
const config = require('./config')
module.exports = setup

function setup() {
  // return connection.migrate.latest({
  //   migrations: path.join(__dirname, './migrations')
  // })
}

