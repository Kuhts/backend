const path = require('path')
const fs = require('fs')
const jsonPath = path.join(__dirname, 'movements.json')
const json = fs.readFileSync(jsonPath)
exports.seed = async function(knex) {
  const table = knex('movements')
  const list = await table.count('*').limit(1)
  if (list.length) {
    return
  }
  // Inserts seed entries
  return table.insert(JSON.parse(json));
}
