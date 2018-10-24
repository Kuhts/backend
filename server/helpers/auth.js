const bcrypt = require('bcryptjs')

module.exports = {
  comparePass,
  transferSocketId,
}

function transferSocketId(req, res, next) {
  const { query, session, user, } = req
  const { passport, } = session
  const { socketId, } = query
  session.socketId = socketId
  session.user = user
  next()
}

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword)
}
