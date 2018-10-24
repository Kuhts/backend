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
const env = require('env')
const {
  TWITTER_CONFIG,
  GOOGLE_CONFIG,
  FACEBOOK_CONFIG,
  GITHUB_CONFIG,
} = env
const toProvider = require('./to-provider')
// const user = require('db/queries/user')
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

  // The callback that is invoked when an OAuth provider sends back user
  // information. Normally, you would save the user to the database
  // in this callback and it would be customized for each provider.
  const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile)

  // Adding each OAuth provider's strategy to passport
  // pass.use(new TwitterStrategy(TWITTER_CONFIG, callback))
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback))
  passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback))
  passport.use(new GithubStrategy(GITHUB_CONFIG, callback))
  passport.use(new LocalStrategy(localCallback))
}
function deserializeUser(obj, cb) {
  cb(null, obj)
}
function serializeUser(data, cb) {
  const { provider: prov, } = data
  const { key, } = toProvider[prov](data)
  provider.create({
    data,
    provider: prov,
    key,
  }).then(() => cb(null, {
    provider: prov,
    key,
  }))
}

function localCallback(username, password, done) {
  console.log(username, password, done)
  // knex('users').where({
  //   username,
  // }).first()
  // .then((user) => {
  //   if (!user) {
  //     return done(null, false);
  //   } else if (!auth.comparePass(password, user.password)) {
  //     return done(null, false);
  //   } else {
  //     return done(null, user);
  //   }
  // })
  // .catch((err) => done(err))
  // done(null, false, { message: 'still setting up' })
}
