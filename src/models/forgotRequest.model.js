const db = require ("../helpers/db.helper")

const table = "forgotRequest"

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit =parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = ` SELECT * FROM "${table}" WHERE "email" LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2`
  
    const values= [limit, offset, `%${search}%`]

    const {rows} = await db.query(query, values)
    return rows 
}

exports.insert = async function(data){
    const query =`
  INSERT INTO "${table}"
   ("email",
   "code"
    
   )
  VALUES ($1, $2) RETURNING *
  `
    const values=[
        data.email,
        data.code]
    const {rows} = await db.query(query, values)
    return rows[0]
}
exports.update = async function(id, data){
    const query = `
  UPDATE "${table}"  SET 
  "email" = COALESCE(NULLIF($2, ''), "email"),
  "code" = COALESCE(NULLIF($3, ''), "code")
     WHERE "id" = $1 
  RETURNING *
  `
    const values=[id, 
        data.email,
        data.code]

    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function(id){
    const query = `
  DELETE from "${table}" WHERE "id"=$1 RETURNING *
`
    const values= [id]

    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneBycode = async function(code){
    const query =`
SELECT * FROM  "${table}" WHERE "id"=$1
`
    const values = [code]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneBycodeAndEmail = async function(code, email){
    const query =`
SELECT * FROM  "${table}" WHERE "code"=$1 AND "email"=$2
`
    const values = [code, email]
    const {rows} = await db.query(query, values)
    return rows[0]
}

