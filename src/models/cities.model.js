const db = require("../helpers/db.helper")

const table = "cities"

exports.findAll = async function (page, limit, search, sort, sortBy) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 5
  search = search || ""
  sort = sort || "id"
  sortBy = sortBy || "ASC"

  const offset = (page - 1) * limit

  const query = ` SELECT * FROM "${table}" WHERE "name" LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2`

  const values = [limit, offset, `%${search}%`]

  const { rows } = await db.query(query, values)
  return rows
}

exports.insert = async function (data) {
  const query = `
  INSERT INTO "${table}"
   ("picture","name"
    
   )
  VALUES ($1, $2) RETURNING *
  `
  const values = [data.picture, data.name]
  const { rows } = await db.query(query, values)
  return rows[0]
}
exports.update = async function (id, data) {
  const query = `
  UPDATE "${table}"  SET 
  "picture" = COALESCE(NULLIF($2, ''), "picture"),
  "name" = COALESCE(NULLIF($3, ''), "name")
     WHERE "id" = $1 
  RETURNING *
  `
  const values = [id, data.picture, data.name]

  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.destroy = async function (id) {
  const query = `
  DELETE from "${table}" WHERE "id"=$1 RETURNING *
`
  const values = [id]

  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.findOne = async function (id) {
  const query = `
SELECT * FROM  "${table}" WHERE id=$1
`
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}
exports.findOnecity = async function (id) {
  const query = `
SELECT * FROM  "${table}" WHERE id=$1
`
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.findCity = async function () {
  const query = `
SELECT * FROM  "${table}" 
`
  const { rows } = await db.query(query)
  return rows
}
