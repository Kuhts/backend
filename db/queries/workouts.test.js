const uuid = require('uuid')
const {
  omitTime,
} = require('db/queries/helper')
const {
  users,
  workouts,
} = require('db/queries')
const validator = require('validator')

describe('workouts queries', () => {
  test('fail without a user', async () => {
    expect.assertions(2)
    const user_id = uuid.v4()
    const workout = {
      id: uuid.v4(),
      user_id: user_id,
      contents: [],
      name: '',
      description: '',
      pathname: 'knownpathname',
      privacy: {},
    }
    // create workout - FAIL
    await expect(workouts.create(user_id, workout)).rejects.toThrow()
    // create user
    await users.create({
      id: user_id,
    })
    // create workout SUCCESS
    const result = await workouts.create(user_id, workout)
    expect(omitTime(result)).toEqual(workout)
    // cleanup user
    await users.remove({
      id: user_id,
    })
    await workouts.remove({
      user_id,
    })
  })

  test('has default values', async () => {
    expect.assertions(9)
    const user_id = uuid.v4()
    await users.create({ id: user_id, })
    const workout = await workouts.create(user_id)
    expect(validator.isUUID(workout.id)).toBe(true)
    expect(validator.isUUID(workout.pathname)).toBe(true)
    expect(workout.user_id).toBe(user_id)
    expect(workout.name).toBe('')
    expect(workout.description).toBe('')
    expect(workout.contents).toEqual([])
    expect(workout.privacy).toEqual({})
    expect(workout.created_at).toBeInstanceOf(Date)
    expect(workout.updated_at).toBeInstanceOf(Date)
  })

  describe('update', () => {
    test('can update a workout', async () => {
      const user_id = uuid.v4()
      await users.create({ id: user_id, })
      const workout = await workouts.create(user_id)
      expect(workout.description).toBe('')
      const description = `some very long description`
      const updated = await workouts.update({
        id: workout.id,
      }, {
        description,
      }).then((workouts) => workouts[0])
      expect(updated.description).toBe(description)
    })
    test('can update contents', async () => {
      expect.assertions(2)
      const user_id = uuid.v4()
      await users.create({ id: user_id, })
      const workout = await workouts.create(user_id)
      expect(workout.contents).toEqual([])
      const contents = [1, 2, 3]
      const updated = await workouts.update({
        id: workout.id,
      }, {
        contents,
      }).then((workouts) => workouts[0])
      expect(updated.contents).toEqual(contents)
    })
  })
})
