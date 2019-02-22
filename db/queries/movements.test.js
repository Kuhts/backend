const uuid = require('uuid')
const {
  omitTime,
} = require('db/queries/helper')
const {
  movements,
} = require('db/queries')
const validator = require('validator')

describe('workouts queries', () => {
  test('can be created generically', async () => {
    expect.assertions(1)
    const id = uuid.v4()
    const created = await movements.create({ id, })
    expect(omitTime(created)).toEqual({
      bodypart: '',
      category: 'cardio',
      difficulty: 0,
      id,
      image: '',
      muscles: [],
      name: '',
      pathname: id,
      spectrum: '',
      steps: [],
      summary: '',
      tags: []
    })
    await movements.remove({ id, })
  })

  test('can generate own id', async () => {
    expect.assertions(1)
    const created = await movements.create()
    expect(validator.isUUID(created.id)).toBe(true)
  })

  test('can update movements', async () => {
    expect.assertions(2)
    const id = uuid.v4()
    const created = await movements.create({ id, })
    expect(created.summary).toBe('')
    const summary = 'a summary'
    const updated = await movements.update({ id, }, { summary, })
    expect(updated[0].summary).toBe(summary)
  })
})
