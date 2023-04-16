const citiesRouter = require ("express").Router()

const citiesController =require("../../controllers/admin/cities.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")

citiesRouter.get("/", validate("getAll"),citiesController.getAllCities)
citiesRouter.get("/:id",validate("idParams"), citiesController.getOneCities)
citiesRouter.post("/", uploadMiddleware("picture"), citiesController.createCities)
citiesRouter.patch("/:id", uploadMiddleware("picture"),validate("idParams"), citiesController.updateCities)
citiesRouter.delete("/:id",validate("idParams"), citiesController.deleteCities)


module.exports = citiesRouter
