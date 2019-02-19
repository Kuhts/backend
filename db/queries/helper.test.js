// omitTime
// queryableArray
const uuid = require('uuid')
const {
  omitTime,
  queryableArray,
} = require('db/queries/helper')
test('omitTime', () => {
  expect.assertions(3)
  const date = new Date()
  const created_at = date
  const updated_at = date
  const id = uuid.v4()
  expect(omitTime({})).toEqual({})
  expect(omitTime({
    created_at,
    updated_at,
  })).toEqual({})
  expect(omitTime({
    created_at,
    updated_at,
    id,
  })).toEqual({
    id,
  })
})

test('queryableArray', () => {
  expect.assertions(3)
  expect(queryableArray()).toBe('[]')
  expect(queryableArray({})).toBe('[]')
  expect(queryableArray([1,2,3])).toBe('[1,2,3]')
})