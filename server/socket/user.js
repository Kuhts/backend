const {
  user,
  provider,
} = require('db/queries')
const {
  toProvider,
} = require('server/helpers')

module.exports = userAuthentication

function userAuthentication(req, res) {
  const { app, session, } = req
  const {
    socketId,
    user: userSession,
    passport: {
      user: passUser,
    },
  } = session
  const {
    key,
    provider: passProvider,
  } = passUser
  const io = app.get('io')
  const socket = io.in(socketId)
  const nu = provider.get(passUser)
  console.log('looking up', userSession, passUser)
  const cached = userSession || passUser
  const old = cached && user.getByProvider(cached)
  // const loggingIn = userSession || user.getByProvider(passUser)
  Promise.all([nu, old]).then(([{
    data: newProvider
  }, oldUser]) => {
    const prov = toProvider[passProvider](newProvider)
    if (oldUser) {
      // merge new provider onto old user
      return user.updateProvider(oldUser, passProvider, prov)
        .then((user) => response(['providers', passProvider], prov))
    } else {
      console.log('creating user', oldUser, prov, newProvider)
      // create new user
      return user.create({
        image: prov.image,
        providers: {
          [passProvider]: prov,
        },
      }).then((data) => response([], data))
    }
  }).then((data) => {
    return provider.remove(passUser).then(() => {
      socket.emit('update', data)
      res.end()
    })
  }).catch((err) => {
    console.log(err)
  }).then(() => {
    socket.emit('authenticated')
  })
}

function response(path, value) {
  return {
    container: 'user',
    path,
    value,
  }
}
