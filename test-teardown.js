const {
  client,
} = require('server')

module.exports = async () => {
  client.end(true)
}
