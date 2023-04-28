const db = require ("../helpers/db.helper")

const table = "events"

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit =parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit

    const query = ` SELECT * FROM "${table}" WHERE "tittle" LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2`
  
    const values= [limit, offset, `%${search}%`]

    const {rows} = await db.query(query, values)
    return rows 
}

exports.insert = async function(data){
    const query =`
  INSERT INTO "${table}"
   ("picture",
    "tittle", 
    "date", 
    "cityId", 
    "descriptions"
   )
  VALUES ($1, $2,$3,$4, $5) RETURNING *
  `
    const values=[
        data.picture, 
        data.tittle,
        data.date,
        data.cityId,
        data.descriptions]
    const {rows} = await db.query(query, values)
    return rows[0]
}
exports.update = async function(id, data){
    const query = `
  UPDATE "${table}"  SET 
  "picture" = COALESCE(NULLIF($2, ''), "picture"),
  "tittle" = COALESCE(NULLIF($3, ''), "tittle"),    
  "date" = COALESCE(NULLIF($4::DATE, NULL), "date"),    
  "cityId" = COALESCE(NULLIF($5::INTEGER, NULL), "cityId"), 
  "descriptions" = COALESCE(NULLIF($6, ''), "descriptions")
     WHERE "id" = $1 
  RETURNING *
  `
    const values=[id, 
        data.picture, 
        data.tittle,
        data.date,
        data.cityId,
        data.descriptions]

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
SELECT * FROM  "${table}" WHERE code=$1
`
    const values = [code]
    const {rows} = await db.query(query, values)
    return rows[0]
}
exports.findOneById = async function(){
    const query =`
SELECT * FROM  "${table}" 
`
  
    const {rows} = await db.query(query)
    return rows
}


exports.findOne = async function(id){
    const query =`
SELECT * FROM  "${table}" WHERE id=$1
`
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
