const {
  movements,
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
  return movements
    .write(req.params.id, req.body)
    .then(() => res.json({}))
}

function makeDocCols(columns) {
  return columns.map((key) => `movements.${key}`)
}

function get(req, res) {
  const cols = docColumns.concat(['movements.contents'])
  return movements.get(cols, {
    user_id: req.user.id,
    'movements.pathname': req.params.id,
  })
    .then((doc) => res.json(doc))
}

function create(req, res) {
  const { body, user, } = req
  return movements.create(user.id, body).then((doc) => {
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
    movements.getMany(docColumns, selectors),
    movements.count({
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
