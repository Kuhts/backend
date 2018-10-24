
exports.up = function(knex, Promise) {
  return knex.schema.createTable('providers', (table) => {
    table.increments('id').primary();
    table.json('data').notNullable()
    table.string('provider').notNullable(null)
    table.string('key').notNullable(null)
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('providers')
}
