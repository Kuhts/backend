const key = 'users'

exports.up = function(knex) {
  return knex.schema.hasTable(key).then((exists) => {
    if (exists) {
      return
    }
    return knex.schema.createTable(key, (table) => {
      table.uuid('id').primary()
      table.string('username').unique().notNullable()
      table.string('password').defaultTo(null)
      table.jsonb('providers').defaultTo(null)
      table.string('image').defaultTo(null)
      table.string('email').defaultTo(null)
      table.string('phone').defaultTo(null)
      table.boolean('admin').notNullable().defaultTo(false)
      table.string('2fa').defaultTo(null)
      table.string('pathname').unique().notNullable()
      table.jsonb('blacklistedAttributes').defaultTo(null)
      table.timestamps(true, true)
    })
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(key)
}
