const passport = require('passport')
const {
  isEqual,
} = require('lodash')
const {
  Strategy: TwitterStrategy,
} = require('passport-twitter')
const {
  Strategy: LocalStrategy,
} = require('passport-local')
const {
  OAuth2Strategy: GoogleStrategy,
} = require('passport-google-oauth')
const {
  Strategy: FacebookStrategy,
} = require('passport-facebook')
const {
  Strategy: GithubStrategy,
} = require('passport-github')
const {
  Strategy: RedditStrategy,
} = require('passport-reddit')
const OAuth2Strategy = require('passport-oauth2')
const env = require('env')
const {
  TWITTER_CONFIG,
  GOOGLE_CONFIG,
  FACEBOOK_CONFIG,
  GITHUB_CONFIG,
  MEDIUM_CONFIG,
  REDDIT_CONFIG,
} = env
const toProvider = require('./to-provider')
const user = require('db/queries/user')
const {
  connection
} = require('db')
const {
  provider,
} = require('db/queries')
const auth = require('./auth')

module.exports = setup

function setup () {
  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser(serializeUser)
  passport.deserializeUser(deserializeUser)
  // Adding each OAuth provider's strategy to passport
  passport.use(new TwitterStrategy(TWITTER_CONFIG, callback))
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback))
  passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback))
  passport.use(new GithubStrategy(GITHUB_CONFIG, callback))
  passport.use(new RedditStrategy(REDDIT_CONFIG, callback))
  passport.use('medium', new OAuth2Strategy(MEDIUM_CONFIG, callback))
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
  return user.updateProvider(usr, provider, prov)
}

function create(prov) {
  const { image, provider, } = prov
  return user.getByProvider(prov)
    .then((data) => data || user.create({
      image,
      providers: {
        [provider]: prov,
      },
    }))
}

function deserializeUser(id, cb) {
  return user.get({
    id,
  }).then(([user]) => cb(null, user)).catch(cb)
}

function serializeUser(data, cb) {
  console.log('serializing', data.id, data)
  return cb(null, data.id)
}

// function localCallback(username, password, done) {
//   console.log(username, password, done)
// }
