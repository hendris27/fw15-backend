const db = require("../helpers/db.helper")

const table = "wishList"

exports.findAll = async (page, limit) => {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    // search = search || ""
    // sort = sort || "id"
    // sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = ` 
   SELECT * FROM "${table}" LIMIT $1 OFFSET $2
    `

    const values = [limit, offset]

    const { rows } = await db.query(query, values)
    return rows
}
exports.destroy = async function (id) {
    const query = `
  DELETE from "${table}" WHERE "id"=$1 RETURNING *
`
    const values = [id]

    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data) {
    const query = `
  INSERT INTO "${table}" ("eventId", "userId")
  VALUES ($1, $2) RETURNING *
  `
    const values = [data.eventId, data.userId]

    const { rows } = await db.query(query, values)
    return rows[0]
}
exports.update = async function (id, data) {
    const query = `
  UPDATE "${table}" 
  SET 
  "eventId" = COALESCE(NULLIF($2::INTEGER, NULL), "eventId"),
  "userId" = COALESCE(NULLIF($3::INTEGER, NULL), "userId")
  WHERE "id" = $1 
  RETURNING *
  `
    const values = [id, data.eventId, data.userId]

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

exports.findOneByEmail = async function (email) {
    const query = `
SELECT * FROM  "${table}" WHERE email=$1
`
    const values = [email]
    const { rows } = await db.query(query, values)
    return rows[0]
}
