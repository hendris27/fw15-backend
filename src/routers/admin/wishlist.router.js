const wishlistRouter = require ("express").Router()

const wishlistController =require("../../controllers/admin/wishlist.controller")
const validate = require("../../middlewares/validator.middleware")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

wishlistRouter.get("/", validate("getAll"),wishlistController.getAllwishlist)
wishlistRouter.get("/:id",validate("idParams"), wishlistController.getOnewishlist)
wishlistRouter.post("/", validate("createUpdatewishlist"),wishlistController.createwishlist)
wishlistRouter.patch("/:id", validate("createUpdatewishlist"), validate("idParams"), wishlistController.updatewishlist)
wishlistRouter.delete("/:id", validate("idParams"),wishlistController.deletewishlist)


module.exports = wishlistRouter
