const {
  omit,
} = require('lodash')
const {
  remove,
  create,
} = require('db/queries/users')
const {
  user,
} = require('server/functions/auth')

const providerData = {
  provider: 'providername',
  key: '123456789',
}
const req = {
  user: providerData,
}
const username = 'mybrandnewusername'
const original = {
  "2fa": null,
  "admin": false,
  "email": null,
  "image": null,
  "phone": null,
  username,
  pathname: username,
  providers: {
    [providerData.provider]: {
      key: providerData.key,
    },
  },
}
test('auth: looks up users by providers', async () => {
  const res = {
    body: null,
    json: function (json) {
      this.body = json
    },
  }
  try {
    await create(original)
    await user(req, res)
    const { body, } = res
    expect(omit(body, ['created_at', 'updated_at'])).toEqual(original)
  } finally {
    await remove({
      username,
    })
  }
})