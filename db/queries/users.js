const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const {
  assign,
  isEqual,
  keys,
  pick,
  omit,
} = require('lodash')
const {
  connection,
} = require('db')
const name = 'users'
const generics = require('db/queries/generics')
const crud = generics(table)
const users = {
  remove: crud.remove,
  update: crud.update,
  read: crud.read,
  create,
  name,
  getByProvider,
  sterilize,
  updateProvider,
  setProviders,
  removeProvider,
  publicize,
}

module.exports = users

function table() {
  return connection(name)
}

function publicize(user) {
  const whitelist = ['username', 'pathname', 'image', 'email', 'phone', 'created_at']
  return pick(user, whitelist)
}

async function removeProvider(user, key) {
  const { providers, } = user
  const prov = providers[key]
  if (!prov) {
    return user
  }
  if (keys(providers).length === 1) {
    throw new Error('Unable to unlink only remaining provider.')
  }
  delete providers[key]
  return setProviders(user.id, providers)
}

function updateProvider(user, key, provider) {
  let { providers, } = user
  providers = providers || {}
  if (isEqual(provider, providers[key])) {
    return Promise.resolve(user)
  }
  const prov = assign({}, providers, {
    [key]: provider,
  })
  return setProviders(user.id, prov)
}

function setProviders(id, providers) {
  return crud.update({ id, }, { providers, })
    .then((docs) => docs[0])
}

function sterilize(user) {
  return omit(user, ['id'])
}

async function getByProvider({
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
  return table()
    .where(raw)
    .then((users) => users[0])
}

function generateUsername () {
  const identifier = Math.random() * 1e18
  return `username${parseInt(identifier)}`
}

function create(data = {}) {
  const username = data.username || generateUsername()
  const pathname = data.pathname || username
  const id = data.id || uuid.v4()
  const user = assign({}, data, {
    id,
    username,
    pathname,
  })
  return crud.create(user)
}
