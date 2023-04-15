const citiesRouter = require ("express").Router()

const citiesController =require("../../controllers/admin/cities.controller")
// const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")

citiesRouter.get("/", citiesController.getAllCities)
citiesRouter.get("/:id", citiesController.getOneCities)
citiesRouter.post("/", uploadMiddleware("picture"), citiesController.createCities)
citiesRouter.patch("/:id", uploadMiddleware("picture"), citiesController.updateCities)
citiesRouter.delete("/:id", citiesController.deleteCities)


module.exports = citiesRouter
