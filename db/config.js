const {
  NODE_ENV,
  DATABASE_URL: connection,
} = require('../env')

const client = 'postgresql'
const pool = {
  min: 2,
  max: 10,
}
const migrations = {
  users: 'users',
  documents: 'documents',
  movements: 'movements',
  muscles: 'muscles',
  equipment: 'equipment',
}
const config = {
  pool,
  client,
  migrations,
  connection,
  debug: true,
  asyncStackTraces: true,
  seeds: {
    directory: './seeds/',
  },
}

const configs = {
  staging: config,
  production: config,
  development: config,
}

configs.chosen = configs[NODE_ENV]

module.exports = configs
