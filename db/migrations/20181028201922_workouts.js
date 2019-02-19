const key = 'workouts'

exports.up = function(knex) {
  return knex.schema.hasTable(key).then((exists) => {
    if (exists) {
      return
    }
    return knex.schema.createTable(key, (table) => {
      table.uuid('id').primary()
      table.string('name').defaultTo('')
      table.text('description').defaultTo('')
      table.string('pathname').defaultTo('')
      table.jsonb('contents').defaultTo('[]')
      table.jsonb('privacy').defaultTo('{}')
      table.uuid('user_id').notNullable()
      table.timestamps(true, true)
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
    })
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(key)
}
