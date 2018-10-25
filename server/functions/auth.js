const {
  getByProvider,
  sterilize,
} = require('db/queries/user')
module.exports = {
  // twitter,
  // google,
  // facebook,
  // github,
  user,
}

function user(req, res) {
  // const io = req.app.get('io')
  return getByProvider(req.user).then((user) => {
    res.json(sterilize(user))
    // io.in(req.session.socketId).emit('user', user)
    // res.end()
  })
}

// function twitter(req, res) {
//   const io = req.app.get('io')
//   const user = {
//     name: req.user.username,
//     photo: req.user.photos[0].value.replace(/_normal/, '')
//   }
//   io.in(req.session.socketId).emit('twitter', user)
//   res.end()
// }

// function google (req, res) {
//   const io = req.app.get('io')
//   const user = {
//     name: req.user.displayName,
//     photo: req.user.photos[0].value.replace(/sz=50/gi, 'sz=250')
//   }
//   io.in(req.session.socketId).emit('google', user)
//   res.end()
// }

// function facebook (req, res) {
//   const io = req.app.get('io')
//   const { givenName, familyName } = req.user.name
//   const user = {
//     name: `${givenName} ${familyName}`,
//     photo: req.user.photos[0].value
//   }
//   io.in(req.session.socketId).emit('facebook', user)
//   res.end()
// }

// function github (req, res) {
//   console.log('user', req.user)
//   const io = req.app.get('io')
//   const user = {
//     name: req.user.username,
//     photo: req.user.photos[0].value
//   }
//   console.log(req.session)
//   io.in(req.session.socketId).emit('github', user)
//   res.end()
// }
