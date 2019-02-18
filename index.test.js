const path = require('path')
const {
  start,
} = require('server')
const {
  client,
} = require('server/redis')
const knex = require('db/connection')
const migrations = {
  migrations: path.join(__dirname, '..', 'db', 'migrations'),
}
describe('routes : auth', () => {
  let app
  beforeAll(async () => {
    app = await start()
  })
  beforeEach(() => {
    return knex.migrate.rollback(migrations)
      .then(() => knex.migrate.latest(migrations))
  })
  afterEach(() => {
    return knex.migrate.rollback(migrations)
  })
  afterAll(() => {
    client.end(true)
    return app.close()
  })
})

require('server/routes/v1/index.test')
