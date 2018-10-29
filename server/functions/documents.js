const {
  documents,
} = require('db/queries')

module.exports = {
  create,
  get,
}

function create(req, res) {
  return documents.create(req.user.id, req.body).then((doc) => {
    res.json(doc)
  })
}

function get(req, res) {
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
  const columns = [
    'created_at',
    'updated_at',
    'id',
    'name',
    'pathname',
    // 'userId',
  ]
  return Promise.all([
    documents.get(columns, selectors),
    documents.count({
      userId,
    }),
  ]).then(([data, total]) => {
    res.json({
      data,
      total: total[0].count,
    })
  })
}
