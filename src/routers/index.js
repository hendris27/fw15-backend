const router = require("express").Router()

router.get("/", (request, response) =>{
    return response.json({
        success: true,
        message: "Backend is running"
    })
})
router.use("*", (request, response) => {
    return response.status(404).json({
        succes:false,
        message:"Resource not found"
    })
})

router.use("/admin", require("./admin.router"))

module.exports = router
