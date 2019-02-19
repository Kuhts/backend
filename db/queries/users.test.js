const uuid = require('uuid')
const {
  assign,
} = require('lodash')
const {
  omitTime,
} = require('db/queries/helper')
const {
  users,
} = require('db/queries')

describe('users', () => {
  test('can be created', async () => {
    expect.assertions(3)
    const id = uuid.v4()
    const username = 'whatusername'
    const user = await users.create({
      id,
      username,
      pathname: username,
    })
    expect(user.created_at).toBeInstanceOf(Date)
    expect(user.updated_at).toBeInstanceOf(Date)
    expect(omitTime(user)).toEqual({
      "2fa": null,
      "admin": false,
      "email": null,
      id,
      "image": null,
      "pathname": username,
      "phone": null,
      "providers": null,
      "username": username,
    })
    await users.remove({
      username,
    })
  })

  test('can be destroyed', async () => {
    const user = await users.create()
    const result = await users.remove({
      id: user.id,
    }).then((users) => users[0])
    expect(result).toEqual(user)
    users.remove({
      id: user.id,
    })
  })

  describe('updateProvider()', () => {
    test('a single provider can be updated', async () => {
      expect.assertions(2)
      const user = await users.create()
      expect(user.providers).toEqual(null)
      const provider = 'myco'
      const key = 123456789
      const extradata = 'blah blah blach'
      const updated = await users.updateProvider(user, provider, {
        key,
        extradata,
      })
      expect(updated.providers).toEqual({
        [provider]: {
          key,
          extradata,
        }
      })
      await users.remove({
        id: user.id,
      })
    })

    test('a provider may not need to be updated', async () => {
      expect.assertions(2)
      const provider = 'identityprovider'
      const key = 987654321
      const extradata = 'blah blah bl'
      const data = {
        key,
        extradata,
      }
      const providers = {
        [provider]: data,
      }
      const user = await users.create({
        providers,
      })
      expect(user.providers).toEqual(providers)
      const updated = await users.updateProvider(user, provider, {
        key,
        extradata,
      })
      expect(updated.providers).toEqual(providers)
    })

    test('a user can be gotten by its provider', async () => {
      expect.assertions(1)
      const user = await users.create()
      const provider = 'providing'
      const key = uuid.v4()
      const updated = await users.updateProvider(user, provider, { key, })
      const found = await users.getByProvider({
        provider,
        key,
      })
      expect(updated).toEqual(found)
      await users.remove({
        id: user.id,
      })
    })
  })
  test('a user\'s data can be sterilized', async () => {
    const user = await users.create()
    expect(users.sterilize(user)).toEqual({
      '2fa': user['2fa'],
      username: user.username,
      providers: user.providers,
      created_at: user.created_at,
      updated_at: user.updated_at,
      phone: user.phone,
      admin: user.admin,
      password: user.password,
      image: user.image,
      email: user.email,
      pathname: user.pathname,
    })
    await users.remove({
      id: user.id,
    })
  })

  describe('removeProvider', () => {
    test('providers can be removed', async () => {
      expect.assertions(2)
      const provider1 = 'id-provider'
      const provider2 = 'second-provider'
      const key = 'uniqueness'
      const providers = {
        [provider2]: {
          key,
        },
        [provider1]: {
          key,
        },
      }
      const user = await users.create({
        providers,
      })
      expect(user.providers).toEqual(providers)
      const removed = await users.removeProvider(user, provider2)
      expect(removed.providers).toEqual({
        [provider1]: {
          key,
        },
      })
      await users.remove({
        id: user.id,
      })
    })

    test('will not fail if provider does not exist', async () => {
      expect.assertions(2)
      const provider1 = 'id-provider'
      const provider2 = 'second-provider'
      const key = 'uniqueness'
      const providers = {
        [provider1]: {
          key,
        },
      }
      const user = await users.create({
        providers,
      })
      expect(user.providers).toEqual(providers)
      const removed = await users.removeProvider(user, provider2)
      expect(removed.providers).toEqual({
        [provider1]: {
          key,
        },
      })
      await users.remove({
        id: user.id,
      })
    })

    test('will fail if only provider left', async () => {
      expect.assertions(2)
      const provider1 = 'id-provider'
      const key = 'uniqueness'
      const providers = {
        [provider1]: {
          key,
        },
      }
      const user = await users.create({
        providers,
      })
      expect(user.providers).toEqual(providers)
      await expect(users.removeProvider(user, provider1)).rejects.toThrow()
      await users.remove({
        id: user.id,
      })
    })
  })

  test('publicize', () => {
    expect.assertions(2)
    const user = {
      username: 'blah',
      phone: '+1234567890',
    }
    expect(users.publicize(user)).toEqual(user)
    const extended = assign({
      another: 'value',
    }, user)
    expect(users.publicize(user)).toEqual(user)
  })
})
