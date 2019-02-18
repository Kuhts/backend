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
const RedisStore = require('connect-redis')(session)
const boom = require('express-boom')
const db = require('db')
const routes = require('server/routes')
const redis = require('redis')
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
  REDIS_URL,
  NODE_ENV,
  DOMAIN,
  PORT,
} = require('env')

const client = redis.createClient(REDIS_URL)
const app = express()

const dir = process.cwd()
let server = null

module.exports = {
  start,
  app,
  client,
}

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

const store = new RedisStore({
  client,
})
app.use(cors({
  credentials: true,
  origin: true,
  optionsSuccessStatus: 200,
}))

app.use(session({
  store,
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: Object.assign({
    path: '/',
  }, DOMAIN ? {
    domain: DOMAIN,
  } : {})
}))

app.use(passport.initialize())
app.use(passport.session())
helpers.setup()

// Connecting sockets to the server and adding them to the request
// so that we can access them later in the controller
const io = socketio(server)
app.set('io', io)
// Catch a start up request so that a sleepy Heroku instance can
// be responsive as soon as possible
// Direct all other requests at our router
app.use('/', routes)
app.get('/', (req, res, next) => {
  res.status(200).send('ack.')
})

function start(port = PORT) {
  return new Promise((resolve, reject) => (
    server.listen(port, (err) => {
      if (err) {
        reject(err)
      } else {
        console.log(`listening on ${port}`)
        resolve(app)
      }
    })
  ))
}