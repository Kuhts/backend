const {
  start,
} = require('server')
const { PORT, } = require('env')
const log = require('log')

module.exports = start(PORT).then(() => {
  log.message(`listening on ${PORT}`)
}).catch((err) => {
  log.exception(err)
})
