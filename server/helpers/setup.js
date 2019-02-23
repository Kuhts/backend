const passport = require('passport')
const strategies = require('server/helpers/strategies')
const env = require('env')
const {
  TWITTER_CONFIG,
  GOOGLE_CONFIG,
  FACEBOOK_CONFIG,
  GITHUB_CONFIG,
  MEDIUM_CONFIG,
  REDDIT_CONFIG,
} = env
const toProvider = require('server/helpers/to-provider')
const users = require('db/queries/users')

module.exports = setup

function setup () {
  const {
    Twitter,
    Google,
    Facebook,
    Github,
    Reddit,
    Medium,
  } = strategies
  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser(serializeUser)
  passport.deserializeUser(deserializeUser)
  // Adding each OAuth provider's strategy to passport
  passport.use(new Twitter(TWITTER_CONFIG, callback))
  passport.use(new Google(GOOGLE_CONFIG, callback))
  passport.use(new Facebook(FACEBOOK_CONFIG, callback))
  passport.use(new Github(GITHUB_CONFIG, callback))
  passport.use(new Reddit(REDDIT_CONFIG, callback))
  // passport.use(new JwtStrategy(JWT_CONFIG, callback))
  passport.use('medium', new Medium(MEDIUM_CONFIG, callback))
  // passport.use(new LocalStrategy(localCallback))
}
// The callback that is invoked when an OAuth provider sends back user
// information. Normally, you would save the user to the database
// in this callback and it would be customized for each provider.
function callback(req, accessToken, refreshToken, profile, cb) {
  const prov = toProvider[profile.provider](profile)
  const { user, } = req
  const prom = user ? merge(user, prov) : create(prov)
  return prom.then((data) => cb(null, user || data)).catch((err) => cb(err))
}

function merge(usr, prov) {
  const { provider, } = prov
  return users.updateProvider(usr, provider, prov)
}

function create(prov) {
  const { image, provider, } = prov
  return users.getByProvider(prov)
    .then((data) => data || users.create({
      image,
      providers: {
        [provider]: prov,
      },
    }))
}

function deserializeUser(id, cb) {
  return users.read({
    id,
  }).then((users) => cb(null, users[0])).catch(cb)
}

function serializeUser(data, cb) {
  return cb(null, data.id)
}
