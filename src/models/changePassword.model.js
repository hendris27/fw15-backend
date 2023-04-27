const db = require ("../helpers/db.helper")

const table = "users"

exports.changePasswordUser = async function(id, data){
    const query = `
  UPDATE "${table}"  SET 
  "password" = COALESCE(NULLIF($2, ''), "password")
   WHERE "id" = $1 
  RETURNING *
  `
    const values=[id, 
        data.password]

    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneByUserId = async function(id){
    const query =`
SELECT * FROM  "${table}" WHERE "id"=$1
`
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
