const {
  connection,
} = require('db')
module.exports = generate

function generate(table) {
  return {
    count,
    remove,
    create,
    update,
    findOne,
    find: read,
    read,
  }

  function count(select) {
    let chain = table()
    if (select) {
      chain = chain.where(select)
    }
    return chain.countDistinct('id')
      .then((counts) => counts[0].count)
  }

  function findOne(where, key = 'created_at', direction = 'asc') {
    return read(where)
      .limit(1)
      .orderBy(key, direction)
      .then((users) => users[0])
  }

  function remove(where) {
    return table()
      .where(where)
      .returning('*')
      .del()
  }

  function update(where, update) {
    return table()
      .where(where)
      .update(update)
      .returning('*')
  }

  function read(where) {
    return table().where(where)
  }

  function create(doc) {
    return table()
      .insert(doc)
      .returning('*')
      .then((docs) => docs[0])
  }
}