const eventRouter = require ("express").Router()
// const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
const eventController = require("../controllers/event.controller")

eventRouter.post("/managecreate", uploadMiddleware("picture"), eventController.createEvents)

module.exports = eventRouter
