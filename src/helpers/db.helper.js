const {Pool} =require("pg")

const db = new Pool({
  connectionString:process.env.DATABASE
})

db.connect().then(()=>{
  console.log("Database connected")
}).catch((err)=>{
  console.log(err)
  console.log("Failed to connected Database!")
})

module.exports= db
