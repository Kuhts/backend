const key = 'muscles'

exports.up = function(knex) {
  return knex.schema.hasTable(key).then((exists) => {
    if (exists) {
      return
    }
    return knex.schema.createTable(key, (table) => {
      table.uuid('id').primary()
      table.string('name').defaultTo('')
      table.text('description').defaultTo('')
      table.string('image').defaultTo('')
      table.timestamps(true, true)
    })
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(key)
}
