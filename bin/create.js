// const Knex = require('knex')
const PG = require('pg')
const {
  parse,
} = require('url')
const {
  chosen,
} = require('db/config')
create()
module.exports = create

async function create() {
  const config = Object.assign({}, chosen)
  const { connection, } = config
  delete config.connection
  const parsed = parse(connection)
  console.log(parsed)
  const client = new PG.Client({
    host: parsed.hostname,
    port: parsed.port,
    database: '',
    password: parsed.auth.split(':')[1],
    user: parsed.auth.split(':')[0],
  })
  await client.connect()


  // connect without database selected
  // var knex = Knex({
  //   client: chosen.client,
  //   connection: {
  //     host: parsed.hostname,
  //     port: parsed.port,
  //     password: parsed.auth.split(':')[1],
  //     user: parsed.auth.split(':')[0],
  //   },
  // })
  const database = 'kuhts'
  await client.query(`CREATE DATABASE ${database};`)
  // const raw = knex.raw(`CREATE DATABASE ${database};`)
  // console.log(raw)

}