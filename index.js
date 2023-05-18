require("dotenv").config({
  path: ".env"
})

const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200
  })
)
// app.use(cors())

app.use("/uploads", express.static("uploads"))

app.use("/", require("./src/routers"))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Aplikasi running on port ${PORT}`)
})
