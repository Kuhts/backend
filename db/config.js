
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
}
const config = {
  client,
  connection,
  pool,
  migrations,
  // debug: true,
  asyncStackTraces: true,
  // // overly simplified snake_case -> camelCase converter
  // postProcessResponse: (result, queryContext) => {
  //   // TODO: add special case for raw results (depends on dialect)
  //   if (Array.isArray(result)) {
  //     return result.map(row => convertToCamel(row));
  //   } else {
  //     return convertToCamel(result);
  //   }
  // }
}

// function convertToCamel(row) {
//   return _.mapKeys((value, key) => _.camelCase(key))
// }

const configs = {
  development: config,
  staging: config,
  production: config
}

configs.chosen = configs[NODE_ENV]

module.exports = configs
