const eventRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
const eventController = require("../controllers/event.controller")
const autMiddleware = require("../middlewares/auth.middleware")
const validate = require("../middlewares/validator.middleware")


eventRouter.get("/manage", autMiddleware, eventController.getOwnedEvent)
eventRouter.get("/:id", eventController.getEvent)
eventRouter.get("/", eventController.getAllEvents)

eventRouter.get("/manage/:id", autMiddleware, eventController.getDetailEvent)
eventRouter.post(
  "/managecreate",
  autMiddleware,
  uploadMiddleware("picture"),
  eventController.createEvents
)
eventRouter.patch(
  "/manageupdate/:id",
  autMiddleware,
  validate("updateEvent"),
  uploadMiddleware("picture"),
  eventController.updateEvent
)
eventRouter.delete("/:id", autMiddleware, eventController.deletedEvent)

module.exports = eventRouter
