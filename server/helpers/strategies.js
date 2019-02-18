const {
  NODE_ENV,
} = require('env')
const OAuth2Strategy = require('passport-oauth2')
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

let strategies
// if (NODE_ENV === 'test') {
//   const Strategy = require('passport-mock').Strategy
//   strategies = {
//     Twitter: Strategy,
//     Local: Strategy,
//     Google: Strategy,
//     Facebook: Strategy,
//     Github: Strategy,
//     Reddit: Strategy,
//     Medium: Strategy,
//   }
// } else {
  strategies = {
    Twitter: TwitterStrategy,
    Local: LocalStrategy,
    Google: GoogleStrategy,
    Facebook: FacebookStrategy,
    Github: GithubStrategy,
    Reddit: RedditStrategy,
    Medium: OAuth2Strategy,
  }
// }
module.exports = strategies
