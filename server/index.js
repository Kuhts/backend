const express = require('express')
const path = require('path')
const fs = require('fs')
const https = require('https')
const http = require('http')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const morgan = require('morgan')
const socketio = require('socket.io')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)
const boom = require('express-boom')
const db = require('db')
const routes = require('server/routes')
const helpers = require('server/helpers')
try {
  const bluebird = require('bluebird')
  bluebird.config({
    warnings: false
  })
} catch (e) {
  console.log(e)
}
const {
  CLIENT_ORIGIN,
  SESSION_SECRET,
  NODE_ENV,
  REDIS_URL,
  PORT,
} = require('env')

const dir = process.cwd()
const app = express()
let server = null

if (NODE_ENV === 'production') {
  server = http.createServer(app)
} else {
  const serverKey = path.join(dir, 'certs', 'server.key')
  const serverCert = path.join(dir, 'certs', 'server.crt')
  const config = {
    key: fs.readFileSync(serverKey),
    cert: fs.readFileSync(serverCert)
  }
  server = https.createServer(config, app)
}

// Setup for passport and to accept JSON objects
app.use(boom())
app.use(express.json())
// before we have athenticated the user
const store = new RedisStore({
  url: REDIS_URL,
  client: redis.createClient(REDIS_URL),
})
app.use(session({
  store,
  secret: SESSION_SECRET,
  resave: false,
  httpOnly: true,
  saveUninitialized: true,
  cookie: { secure: true },
}))

app.use(cors({
  credentials: true,
  origin: CLIENT_ORIGIN,
  optionsSuccessStatus: 200,
}))

app.use((req, res, next) => {
  console.log(req.originalUrl)
  next()
})

app.use(passport.initialize())
app.use(passport.session())
helpers.setup()

// Connecting sockets to the server and adding them to the request
// so that we can access them later in the controller
const io = socketio(server)
app.set('io', io)
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
