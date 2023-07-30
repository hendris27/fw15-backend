const wishlistRouter = require ("express").Router()
const validate = require("../middlewares/validator.middleware")

const wishlistController = require("../controllers/wishlist.controller")

wishlistRouter.get("/", wishlistController.getWishlist)
wishlistRouter.get("/check", wishlistController.checkingWishlist)
wishlistRouter.get("/:id", wishlistController.getDetailWishlist)
wishlistRouter.post("/", validate("addWishlist"),wishlistController.createWishlist)
wishlistRouter.delete("/managedeleted/:id", wishlistController.delWishlist)
module.exports = wishlistRouter
