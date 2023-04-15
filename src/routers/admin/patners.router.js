const patnersRouter = require ("express").Router()

const patnersController =require("../../controllers/admin/patners.controller")
// const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")

patnersRouter.get("/", patnersController.getAllpatners)
patnersRouter.get("/:id", patnersController.getOnepatners)
patnersRouter.post("/", uploadMiddleware("picture"), patnersController.createpatners)
patnersRouter.patch("/:id", uploadMiddleware("picture"), patnersController.updatepatners)
patnersRouter.delete("/:id", patnersController.deletepatners)


module.exports = patnersRouter
