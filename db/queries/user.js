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
const user = {
  create,
  getByProvider,
  sterilize,
  updateProvider,
  update,
  setProviders,
  removeProvider,
  get,
  find,
  findOne,
  publicize,
}

module.exports = user

function publicize(user) {
  const whitelist = ['username', 'pathname', 'image', 'email', 'phone']
  const blacklist = user.blacklistedAttributes || []
  const whitelisted = pick(user, whitelist)
  return omit(whitelisted, blacklist)
}

async function users() {
  const db = await connection
  return db('users')
}

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

function findOne(where) {
  return find(where).limit(1).then(([user]) => user)
}

function find(where) {
  return users().where(where)
}

function update(id, updates) {
  return users().where('id', id)
    .update(updates)
    .returning('*')
    .then(([user]) => user)
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
  return users().where(selector)
}

function setProviders(id, providers) {
  return users()
    .where('id', id)
    .update('providers', providers)
    .returning('*')
    .then(([user]) => user)
}

function sterilize(user) {
  return omit(user, ['id'])
}

async function getByProvider({
  provider,
  key,
}) {
  const db = await connection
  const raw = db.raw('providers @> :providers', {
    providers: JSON.stringify({
      [provider]: {
        key,
      },
    })
  })
  return users()
    .where(raw)
    .then(([user]) => user)
}

function generateUsername () {
  const identifier = Math.random() * 1e18
  return `username${parseInt(identifier)}`
}

function create(user) {
  const username = user.username || generateUsername()
  const pathname = user.pathname || username
  const id = uuid.v4()
  const nu = assign({
    id,
    username,
    pathname,
  }, user)
  return users()
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
