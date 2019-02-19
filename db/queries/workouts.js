const uuid = require('uuid')
const {
  assign,
} = require('lodash')
const {
  queryableArray,
} = require('db/queries/helper')
const {
  connection,
} = require('db')
const generics = require('db/queries/generics')
const crud = generics(table)
const name = 'workouts'
const defaultUserData = {
  'user.author': 'users.username',
}

const workouts = {
  remove: crud.remove,
  read: crud.read,
  update,
  create,
}

module.exports = workouts

function update(where, updates) {
  const { contents, } = updates
  const updateTo = assign({}, updates, contents ? {
    contents: queryableArray(contents),
  } : [])
  return crud.update(where, updateTo)
}

function create(user_id, wrkout = {}) {
  const id = wrkout.id || uuid.v4()
  const pathname = wrkout.pathname || id
  const workout = assign({}, wrkout, {
    id,
    user_id,
    pathname,
    contents: queryableArray(wrkout.contents),
  })
  return crud.create(workout)
}

function table() {
  return connection(name)
}
