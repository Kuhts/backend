const {
  connection,
} = require('db')
const providers = connection('providers')

const provider = {
  create,
  remove,
  get,
}

module.exports = provider

function create(provider) {
  return connection('providers')
    .insert(provider)
    .returning('*')
}

function get({
  key,
  provider,
}) {
  return connection('providers')
    .where({
      key,
      provider,
    }).then(([prov]) => prov)
}

function remove({
  key,
  provider,
}) {
  return connection('providers')
    .where({
      key,
      provider,
    })
    .delete()
}
