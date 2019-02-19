const {
  getByProvider,
  sterilize,
} = require('db/queries/users')
module.exports = {
  user,
}

function user(req, res) {
  return getByProvider(req.user).then((user) => {
    res.json(sterilize(user))
  })
}
