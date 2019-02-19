const {
  workouts,
} = require('db/queries')

const columns = [
  'created_at',
  'updated_at',
  'id',
  'name',
  'pathname'
]
const docColumns = makeDocCols(columns)
module.exports = {
  create,
  getMany,
  get,
  write,
}

function write(req, res) {
  return workouts
    .write(req.params.id, req.body)
    .then(() => res.json({}))
}

function makeDocCols(columns) {
  return columns.map((key) => `workouts.${key}`)
}

function get(req, res) {
  const cols = docColumns.concat(['workouts.contents'])
  return workouts.get(cols, {
    user_id: req.user.id,
    'workouts.pathname': req.params.id,
  })
    .then((doc) => res.json(doc))
}

function create(req, res) {
  const { body, user, } = req
  return workouts.create(user.id, body).then((doc) => {
    res.json(doc)
  })
}

function getMany(req, res) {
  const {
    // query,
    user,
  } = req
  const {
    id: user_id,
  } = user
  // const {
  //   results,
  //   page,
  //   sortField,
  //   sortOrder,
  // } = query
  const selectors = {
    user_id,
  }
  return Promise.all([
    workouts.getMany(docColumns, selectors),
    workouts.count({
      user_id,
    })
  ]).then((results) => {
    const data = results[0]
    const total = results[1]
    res.json({
      data,
      total: total[0].count,
    })
  })
}
