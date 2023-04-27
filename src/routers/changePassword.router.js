const changePasswordRouter = require ("express").Router()
// const validate = require("../middlewares/validator.middleware")
const changePasswordController = require("../controllers/changePassword.controller")

changePasswordRouter.patch("/", changePasswordController.changePassword)

module.exports = changePasswordRouter
