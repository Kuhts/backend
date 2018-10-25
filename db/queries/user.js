const bcrypt = require('bcryptjs')
const {
  assign,
  isEqual,
  omit,
  keys,
} = require('lodash')
const {
  connection,
} = require('db')
const user = {
  create,
  getByProvider,
  sterilize,
  updateProvider,
  setProviders,
  removeProvider,
  get,
}

module.exports = user

function removeProvider(user, key) {
  const { providers, } = user
  const prov = providers[key]
  if (!prov) {
    return Promise.resolve(user)
  }
  if (keys(providers).length === 1) {
    return Promise.reject('Unable to unlink only remaining provider.')
  }
  delete providers[key]
  return setProviders(user.id, providers)
}

function updateProvider(user, key, provider) {
  const { providers = {}, } = user
  if (isEqual(provider, providers[key])) {
    return Promise.resolve(user)
  }
  const prov = assign({}, providers, {
    [key]: provider,
  })
  return setProviders(user.id, prov)
}

function get(selector) {
  return connection('users').where(selector)
}

function setProviders(id, providers) {
  return connection
    .from('users')
    .where('id', id)
    .update('providers', providers)
    .returning('*')
    .then(([user]) => user)
}

function sterilize(user) {
  return omit(user, ['id'])
}

function getByProvider({
  provider,
  key,
}) {
  const raw = connection.raw('providers @> :providers', {
    providers: JSON.stringify({
      [provider]: {
        key,
      },
    })
  })
  return connection('users')
    .where(raw)
    .then(([user]) => user)
}

function generateUsername () {
  const identifier = Math.random() * 1e18
  return `username${parseInt(identifier)}`
}

function create(user) {
  const nu = assign({
    username: generateUsername(),
  }, user)
  return connection('users')
    .insert(nu)
    .returning('*')
    .then(([user]) => user)
}

// function createLocal({
//   username,
//   password: pass,
// }) {
//   const salt = bcrypt.genSaltSync();
//   const password = bcrypt.hashSync(pass, salt);
//   return create({
//     username,
//     password,
//   })
// }
