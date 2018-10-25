const dotenv = require('dotenv')
dotenv.config()
const {
  assign,
} = require('lodash')

const appname = 'characterastronomy'
const {
  PORT = 8080,
  NODE_ENV,
  SESSION_SECRET,
  TWITTER_KEY,
  TWITTER_SECRET,
  GOOGLE_KEY,
  GOOGLE_SECRET,
  FACEBOOK_KEY,
  FACEBOOK_SECRET,
  GITHUB_KEY,
  GITHUB_SECRET,
  PG_CONNECTION_URL = `postgresql://localhost/${appname}`,
} = process.env

const PROD = NODE_ENV === 'production'

const DOMAIN = `${appname}.herokuapp.com`
const DIR = process.cwd()

const PROVIDERS = ['twitter', 'google', 'facebook', 'github']

const callbacks = PROVIDERS.map(provider => {
  const path = `v1/auth/${provider}/callback`
  return PROD
    ? `https://${DOMAIN}/${path}`
    : `https://localhost:8080/${path}`
})

const [twitterURL, googleURL, facebookURL, githubURL] = callbacks

const CLIENT_ORIGIN = PROD
  ? 'https://react-auth-twitter.netlify.com'
  : ['https://127.0.0.1:3000', 'https://localhost:3000']

const TWITTER_CONFIG = config({
  consumerKey: TWITTER_KEY,
  consumerSecret: TWITTER_SECRET,
  callbackURL: twitterURL,
})
const GOOGLE_CONFIG = config({
  clientID: GOOGLE_KEY,
  clientSecret: GOOGLE_SECRET,
  callbackURL: googleURL
})
const FACEBOOK_CONFIG = config({
  clientID: FACEBOOK_KEY,
  clientSecret: FACEBOOK_SECRET,
  profileFields: ['id', 'emails', 'name', 'picture.width(250)'],
  callbackURL: facebookURL
})
const GITHUB_CONFIG = config({
  clientID: GITHUB_KEY,
  clientSecret: GITHUB_SECRET,
  callbackURL: githubURL
})
module.exports = {
  DOMAIN,
  DIR,
  PROVIDERS,
  CLIENT_ORIGIN,
  TWITTER_CONFIG,
  GOOGLE_CONFIG,
  FACEBOOK_CONFIG,
  GITHUB_CONFIG,
  PROD,
  PORT,
  NODE_ENV,
  SESSION_SECRET,
  TWITTER_KEY,
  TWITTER_SECRET,
  GOOGLE_KEY,
  GOOGLE_SECRET,
  FACEBOOK_KEY,
  FACEBOOK_SECRET,
  GITHUB_KEY,
  GITHUB_SECRET,
  PG_CONNECTION_URL,
}

function config(config) {
  return assign({
    passReqToCallback: true
  }, config)
}
