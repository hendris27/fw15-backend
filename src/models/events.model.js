const db = require("../helpers/db.helper")

const table = "events"

exports.findAll = async function (page, limit, search, sort, sortBy) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 10
  search = search || ""
  sort = sort || "id"
  sortBy = sortBy || "ASC"

  const offset = (page - 1) * limit

  const query = ` SELECT * FROM "${table}" WHERE "tittle" LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2`

  const values = [limit, offset, `%${search}%`]

  const { rows } = await db.query(query, values)
  return rows
}

exports.insert = async function (data) {
  const query = `
  INSERT INTO "${table}"
   ("picture",
    "tittle", 
    "date", 
    "cityId", 
    "descriptions"
    "categoryId"
   )
  VALUES ($1,$2,$3,$4,$5,$6) RETURNING *
  `
  const values = [
    data.picture,
    data.tittle,
    data.date,
    data.cityId,
    data.descriptions,
    data.categoryId
  ]
  const { rows } = await db.query(query, values)
  return rows[0]
}
exports.update = async function (id, data) {
  const query = `
  UPDATE "${table}"  SET 
  "picture" = COALESCE(NULLIF($2, ''), "picture"),
  "tittle" = COALESCE(NULLIF($3, ''), "tittle"),    
  "date" = COALESCE(NULLIF($4::DATE, NULL), "date"),    
  "cityId" = COALESCE(NULLIF($5::INTEGER, NULL), "cityId"), 
  "descriptions" = COALESCE(NULLIF($6, ''), "descriptions"),
  "categoryId" = COALESCE(NULLIF($7::INTEGER, NULL), "categoryId")
     WHERE "id" = $1 
  RETURNING *
  `
  const values = [
    id,
    data.picture,
    data.tittle,
    data.date,
    data.cityId,
    data.descriptions,
    data.categoryId
  ]

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

exports.findOneBycode = async function (code) {
  const query = `
SELECT * FROM  "${table}" WHERE code=$1
`
  const values = [code]
  const { rows } = await db.query(query, values)
  return rows[0]
}
exports.findOneById = async function (id) {
  // return console.log(id)
  const query = `
    SELECT
"e"."id",
"e"."picture",
"e"."tittle",
"e"."date",
"e"."descriptions",
"c"."name" as "category",
"ci"."name" as "location"
FROM "eventCategories" "ec"
JOIN "events" "e" ON "e"."id" = "ec"."eventId"
JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
WHERE "e"."id"=$1

`
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}
exports.findAllEvent = async function (
  page,
  limit,
  searchByName,
  searchByCategory,
  searchByLocation,
  sort,
  sortBy
) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 6
  searchByName = searchByName || ""
  searchByCategory = searchByCategory || ""
  searchByLocation = searchByLocation || ""
  sort = sort || "id"
  sortBy = sortBy || "DESC"

  const offset = (page - 1) * limit

  const query = `
    SELECT
"e"."id",
"e".picture,
"e"."tittle",
"e"."date",
"e"."descriptions",
"c"."name" as "category",
"ci"."name" as "location"
FROM "eventCategories" "ec"
JOIN "events" "e" ON "e"."id" = "ec"."eventId"
JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
WHERE "e"."tittle" LIKE $3 AND "c"."name" LIKE $4 AND "ci"."name" LIKE $5
 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
`
  const values = [
    limit,
    offset,
    `%${searchByName}%`,
    `%${searchByCategory}%`,
    `%${searchByLocation}%`
  ]

  const { rows } = await db.query(query, values)
  return rows
}

exports.findOne = async function (id) {
  const query = `
SELECT * FROM  "${table}" WHERE id=$1
`
  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.findOwnedEvent = async function (createdBy) {
  const query = `
  SELECT 
   "${table}".id,
   "${table}".date,
   "${table}".tittle,
   "${table}"."createdAt",
   "cities"."name" as "location"
    FROM  "${table}" 
  
  INNER JOIN "cities" ON "cities"."id" = "${table}"."cityId"
  WHERE "createdBy" = $1
  
  `
  const values = [createdBy]
  const { rows } = await db.query(query, values)
  return rows
}

exports.findOneByIdAndUserId = async function (eventId, createdBy) {
  const query = `
    SELECT * FROM  "${table}" WHERE "id"=$1 AND "createdBy" = $2
    `
  const values = [eventId, createdBy]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.createEvents = async function (data) {
  // return console.log(data)
  const query = `
INSERT INTO "${table}"
 ("picture",
  "tittle", 
  "date", 
  "cityId", 
  "descriptions",
  "createdBy",
  "categoryId"
 )
VALUES ($1, $2,$3,$4, $5, $6, $7) RETURNING *
`
  const values = [
    data.picture,
    data.tittle,
    data.date,
    data.cityId,
    data.descriptions,
    data.createdBy,
    data.categoryId
  ]
  const { rows } = await db.query(query, values)
  return rows[0]
}
