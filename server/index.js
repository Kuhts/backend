const express = require('express')
const path = require('path')
const fs = require('fs')
const https = require('https')
const http = require('http')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const socketio = require('socket.io')
const RedisStore = require('connect-redis')(session);
const boom = require('express-boom')
const db = require('db')
const routes = require('server/routes')
const helpers = require('server/helpers')
const {
  CLIENT_ORIGIN,
  SESSION_SECRET,
  NODE_ENV,
  PORT,
} = require('env')

const dir = process.cwd()
const app = express()
let server = null

if (!NODE_ENV === 'production') {
  server = http.createServer(app)
} else {
  const serverKey = path.join(dir, 'certs', 'server.key')
  const serverCert = path.join(dir, 'certs', 'server.crt')
  // const serverPem = path.join(dir, 'certs', 'rootCA.pem')
  const config = {
    key: fs.readFileSync(serverKey),
    cert: fs.readFileSync(serverCert) // ,
    // ca: fs.readFileSync(serverPem)
  }
  server = https.createServer(config, app)
}

// Setup for passport and to accept JSON objects
app.use(boom())
app.use(express.json())
// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
const store = new RedisStore()
app.use(session({
  store,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
helpers.setup()

// Accept requests from our client
app.use(cors({
  origin: CLIENT_ORIGIN
}))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

// Connecting sockets to the server and adding them to the request
// so that we can access them later in the controller
const io = socketio(server)
app.set('io', io)
// io.on('connect', (socket) => {
//   console.log('connected', socket)
// })

// Catch a start up request so that a sleepy Heroku instance can
// be responsive as soon as possible
app.get('/wake-up', (req, res) => res.send('👍'))

// Direct all other requests at our router
app.use('/', routes)

// db.setup().then(() => (
  server.listen(PORT, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`listening on ${PORT}`)
    }
  })
// ))
