
const {
  NODE_ENV,
  PG_CONNECTION_URL: connection,
} = require('../env')

const client = 'postgresql'
const pool = {
  min: 2,
  max: 10,
}
const migrations = {
  users: 'users',
}
const config = {
  client,
  connection,
  pool,
  migrations,
  // debug: true,
  asyncStackTraces: true,
}

const configs = {
  development: config,
  staging: config,
  production: config
}

configs.chosen = configs[NODE_ENV]

module.exports = configs
