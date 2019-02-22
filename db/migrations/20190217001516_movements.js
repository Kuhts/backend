const key = 'movements'

exports.up = function(knex) {
  return knex.schema.hasTable(key).then((exists) => {
    if (exists) {
      return
    }
    return knex.schema.createTable(key, (table) => {
      table.uuid('id').primary()
      table.string('name').defaultTo('')
      table.text('summary').defaultTo('')
      table.string('pathname').unique()
      /* { id: '', description: '', image: '', } */
      table.jsonb('steps').defaultTo('[]')
      table.string('image').defaultTo('')
      table.string('category').defaultTo('cardio')
      table.jsonb('tags').defaultTo('[]')
      // general category
      table.string('bodypart').defaultTo('')
      // specific muscle
      table.jsonb('muscles').defaultTo('[]')
      table.integer('difficulty').defaultTo(0)
      table.string('spectrum').defaultTo('')
      table.timestamps(true, true)
    })
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(key)
}
