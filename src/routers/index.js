const router = require("express").Router()
const autMiddleware = require("../middlewares/auth.middleware")

router.get("/", (request, response) => {
  return response.json({
    success: true,
    message: "Backend is running",
  })
})

router.use("/auth", require("./auth.router"))
router.use("/admin", autMiddleware, require("../routers/admin/admin.router"))
router.use("/profile", autMiddleware, require("./profile.router"))
router.use("/category", autMiddleware, require("./category.router"))
router.use("/patners", autMiddleware, require("./patners.router"))
router.use("/city", autMiddleware, require("./city.router"))
router.use("/wishlist", autMiddleware, require("./wishlist.router"))
router.use("/changePassword", autMiddleware, require("./changePassword.router"))
router.use("/event", autMiddleware, require("./event.router"))
router.use("/reservation", autMiddleware, require("./reservation.router"))
router.use("/payment", autMiddleware, require("./payment.router"))
// router.use("/history", autMiddleware, require("./history.router"))

router.use("*", (request, response) => {
  return response.status(404).json({
    succes: false,
    message: "Resource not found",
  })
})

module.exports = router
