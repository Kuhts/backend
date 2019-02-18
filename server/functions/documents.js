const {
  documents,
} = require('db/queries')

const columns = [
  'created_at',
  'updated_at',
  'id',
  'name',
  'pathname',
  // 'author',
  // 'userId',
]
const docColumns = makeDocCols(columns)
module.exports = {
  create,
  getMany,
  get,
  write,
}

function write(req, res) {
  return documents
    .write(req.params.id, req.body)
    .then(() => res.json({}))
}

function makeDocCols(columns) {
  return columns.map((key) => `documents.${key}`)
}

function get(req, res) {
  const cols = docColumns.concat(['documents.contents'])
  return documents.get(cols, {
    userId: req.user.id,
    'documents.pathname': req.params.id,
  })
  .then((doc) => res.json(doc))
}

function create(req, res) {
  const { body, user, } = req
  return documents.create(user.id, body).then((doc) => {
    res.json(doc)
  })
}

function getMany(req, res) {
  const {
    query,
    user,
  } = req
  const {
    id: userId,
  } = user
  const {
    results,
    page,
    sortField,
    sortOrder,
  } = query
  const selectors = {
    userId,
  }
  return Promise.all([
    documents.getMany(docColumns, selectors),
    documents.count({
      userId,
    }),
  ]).then((results) => {
    const data = results[0]
    const total = results[1]
    res.json({
      data,
      total: total[0].count,
    })
  })
}
