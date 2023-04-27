const eventRouter = require ("express").Router()
// const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
const eventController = require("../controllers/event.controller")

eventRouter.get("/", eventController.getEvent)
eventRouter.post("/", eventController.createEvent)
eventRouter.patch("/", uploadMiddleware("picture"), eventController.updateEvent)

module.exports = eventRouter
