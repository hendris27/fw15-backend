const router = require("express").Router()
const autMiddleware = require ("../middlewares/auth.middleware")

router.get("/", (request, response) =>{
    return response.json({
        success: true,
        message: "Backend is running"
    })
})

router.use("/auth", require("./auth.router"))
router.use("/admin", autMiddleware,require("./admin.router"))

router.use("*", (request, response) => {
    return response.status(404).json({
        succes:false,
        message:"Resource not found"
    })
})


module.exports = router
