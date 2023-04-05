const router = require("express").Router()

router.use("/users", require("./users.router"))


router.get("/", (request, response) =>{
    return response.json({
        success: true,
        message: "Backend is running"
    })
})

module.exports = router
