const Debug = require('debug')
const message = new Debug('kuhts')
const exception = message.extend('exception')
const requestLogger = message.extend('request')
const dbLogger = message.extend('db')
module.exports = {
  message,
  exception,
  db,
  request,
}

function db(obj) {
  dbLogger('%o', obj)
}

function request(req) {
  requestLogger('%o', {
    url: req.originalUrl,
    method: req.method,
  })
}
