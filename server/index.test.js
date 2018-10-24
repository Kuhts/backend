process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('server')
const knex = require('server/db/connection')

describe('routes : auth', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
  })
  afterEach(() => {
    return knex.migrate.rollback()
  })
})

require('./routes/auth.test')
