require ("dotenv").config({
    path:".env"
})

const express = require ("express")
const app =express()
app.use(express.urlencoded({extended: false}))

app.use("/", require("./src/routers"))

app.get("/", (request, response) =>{
    return response.json({
        success: true,
        message: "Backend is running"
    })
})

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Aplikasi runnung on port ${PORT}`)
})
