
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').unique().notNullable()
    table.string('password').defaultTo(null)
    table.jsonb('providers').defaultTo(null)
    table.string('image').defaultTo(null)
    table.string('email').defaultTo(null)
    table.string('phone').defaultTo(null)
    table.boolean('admin').notNullable().defaultTo(false)
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
