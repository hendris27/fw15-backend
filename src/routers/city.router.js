const citiesRouter = require ("express").Router()
const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
const citiesController = require("../controllers/city.controller")

citiesRouter.get("/", uploadMiddleware("picture"),validate("UpdateProfil"), citiesController.getCity)

module.exports = citiesRouter
