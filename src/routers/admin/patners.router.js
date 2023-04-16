const patnersRouter = require ("express").Router()

const patnersController =require("../../controllers/admin/patners.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")

patnersRouter.get("/", validate("getAll"), patnersController.getAllpatners)
patnersRouter.get("/:id",validate("idParams"), patnersController.getOnepatners)
patnersRouter.post("/", uploadMiddleware("picture"),patnersController.createpatners)
patnersRouter.patch("/:id", uploadMiddleware("picture"), validate("idParams"),patnersController.updatepatners)
patnersRouter.delete("/:id", validate("idParams") ,patnersController.deletepatners)


module.exports = patnersRouter
