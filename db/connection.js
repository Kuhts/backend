const Knex = require('knex')
const config = require('db/config')
const connection = Knex(config.chosen)

module.exports = connection
