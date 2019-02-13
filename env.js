const dotenv = require('dotenv')
dotenv.config()
const {
  assign,
  mapValues,
} = require('lodash')

const appname = 'kuhts-api'
const {
  PORT = 8080,
  NODE_ENV,
  CLIENT_ORIGIN,
  SESSION_SECRET,
  TWITTER_KEY,
  TWITTER_SECRET,
  GOOGLE_KEY,
  GOOGLE_SECRET,
  FACEBOOK_KEY,
  FACEBOOK_SECRET,
  GITHUB_KEY,
  GITHUB_SECRET,
  MEDIUM_KEY,
  MEDIUM_SECRET,
  REDDIT_KEY,
  REDDIT_SECRET,
  DATABASE_URL = `postgresql://localhost/${appname}`,
} = process.env

const PROD = NODE_ENV === 'production'

const DOMAIN = `${appname}.herokuapp.com`
const DIR = process.cwd()

// const PROVIDERS = ['twitter', 'google', 'facebook', 'github', 'medium']
const PROVIDERS = {
  twitter: null,
  google: null,
  facebook: null,
  github: null,
  medium: null,
  reddit: null,
}

const callbacks = mapValues(PROVIDERS, (nil, provider) => {
  const path = `v1/auth/${provider}/callback`
  return PROD
    ? `https://${DOMAIN}/${path}`
    : `https://localhost:8080/${path}`
})

// const [twitterURL, googleURL, facebookURL, githubURL, mediumURL] = callbacks
const {
  facebook: facebookURL,
  twitter: twitterURL,
  google: googleURL,
  github: githubURL,
  medium: mediumURL,
  reddit: redditURL,
} = callbacks

const TWITTER_CONFIG = config({
  consumerKey: TWITTER_KEY,
  consumerSecret: TWITTER_SECRET,
  callbackURL: twitterURL,
})
const GOOGLE_CONFIG = config({
  clientID: GOOGLE_KEY,
  clientSecret: GOOGLE_SECRET,
  callbackURL: googleURL,
})
const FACEBOOK_CONFIG = config({
  clientID: FACEBOOK_KEY,
  clientSecret: FACEBOOK_SECRET,
  profileFields: ['id', 'emails', 'name', 'picture.width(250)'],
  callbackURL: facebookURL,
})
const GITHUB_CONFIG = config({
  clientID: GITHUB_KEY,
  clientSecret: GITHUB_SECRET,
  callbackURL: githubURL,
})
const MEDIUM_CONFIG = config({
  clientID: MEDIUM_KEY,
  clientSecret: MEDIUM_SECRET,
  callbackURL: mediumURL,
  authorizationURL: 'https://api.medium.com/v1/oauth/authorize',
  tokenURL: 'https://api.medium.com/v1/tokens'
})
const REDDIT_CONFIG = config({
  clientID: REDDIT_KEY,
  clientSecret: REDDIT_SECRET,
  callbackURL: redditURL,
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
  MEDIUM_CONFIG,
  REDDIT_CONFIG,
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
  MEDIUM_KEY,
  MEDIUM_SECRET,
  REDDIT_KEY,
  REDDIT_SECRET,
  DATABASE_URL,
}

function config(config) {
  return assign({
    passReqToCallback: true,
  }, config)
}
