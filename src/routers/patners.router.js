const patnersRouter = require ("express").Router()
// const validate = require("../middlewares/validator.middleware")
const patnersController = require("../controllers/patners.controller")

patnersRouter.get("/", patnersController.getPatners)

module.exports = patnersRouter
