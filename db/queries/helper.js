const { omit, } = require('lodash')
module.exports = {
  omitTime,
  queryableArray,
}

function omitTime(object) {
  return omit(object, ['created_at', 'updated_at'])
}

function queryableArray(value) {
  return JSON.stringify(Array.isArray(value) ? value : [])
}
