const router = require("express").Router()

router.get("/", (request, response) =>{
    return response.json({
        success: true,
        message: "Backend is running"
    })
})

router.use("/admin", require("./admin.router"))
router.use("*", (request, response) => {
    return response.status(404).json({
        succes:false,
        message:"Resource not found"
    })
})


module.exports = router
