const Knex = require('knex')
const { chosen, } = require('db/config')
module.exports = Knex(chosen)
