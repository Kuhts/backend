const Knex = require('knex')
const { chosen, } = require('db/config')
const log = require('log')
module.exports = Knex(chosen)
