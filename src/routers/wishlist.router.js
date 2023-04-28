const wishlistRouter = require ("express").Router()
const validate = require("../middlewares/validator.middleware")

const wishlistController = require("../controllers/wishlist.controller")

wishlistRouter.get("/", wishlistController.getWishlist)
wishlistRouter.post("/", validate("addWishlist"),wishlistController.createWishlist)

module.exports = wishlistRouter