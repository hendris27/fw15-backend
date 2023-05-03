const eventRouter = require ("express").Router()
// const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
const eventController = require("../controllers/event.controller")

eventRouter.get("/manage", eventController.getOwnedEvent)
eventRouter.get("/:id", eventController.getEvent)
eventRouter.get("/", eventController.getAllEvents)

eventRouter.get("/manage/:id", eventController.getDetailEvent)
eventRouter.post("/managecreate", uploadMiddleware("picture"), eventController.createEvents)
eventRouter.patch("/manageupdate/:id", uploadMiddleware("picture"),eventController.updateEvent)
eventRouter.delete("/:id", eventController.deletedEvent)

module.exports = eventRouter
