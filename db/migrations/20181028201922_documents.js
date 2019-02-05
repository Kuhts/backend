const key = 'documents'

exports.up = function(knex, Promise) {
  return knex.schema.hasTable(key).then((exists) => {
    if (exists) {
      return
    }
    return knex.schema.createTable(key, (table) => {
      table.uuid('id').primary()
      table.string('name').defaultTo('')
      table.string('description').defaultTo('')
      table.string('pathname').defaultTo('')
      table.jsonb('contents').defaultTo('[]')
      table.jsonb('privacy').defaultTo('{}')
      table.uuid('userId').notNullable()
      table.timestamps(true, true)
      table
        .foreign('userId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
    })
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(key)
}
