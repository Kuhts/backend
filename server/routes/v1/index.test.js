const {
  app,
} = require('server')
const supertest = require('supertest')
test('does allow unauthed users to get public data', async () => {
  let response
  response = await supertest(app)
    .get('/v1/api/wake-up')
    .expect(200)

  expect(response.text).toBe('👍')
})
