const PG = require('pg')
const {
  assign,
} = require('lodash')
const {
  parse,
} = require('url')
const {
  chosen,
} = require('db/config')
create()
module.exports = create

async function create() {
  const config = assign({}, chosen)
  const { connection, } = config
  delete config.connection
  const parsed = parse(connection)
  console.log('creating client')
  const client = new PG.Client({
    host: parsed.hostname,
    port: parsed.port,
    database: 'postgres',
    password: parsed.auth.split(':')[1],
    user: parsed.auth.split(':')[0],
  })
  try {
    console.log('connecting client')
    await client.connect()
    const database = 'kuhts'
    console.log('creating db')
    await client.query(`CREATE DATABASE ${database};`)
  } catch (e) {
    console.log(e)
  } finally {
    await client.end()
  }
}