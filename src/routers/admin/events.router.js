const eventsRouter = require ("express").Router()

const eventsController =require("../../controllers/admin/events.controller")
// const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")

eventsRouter.get("/", eventsController.getAllEvents)
eventsRouter.get("/:id", eventsController.getOneEvents)
eventsRouter.post("/", uploadMiddleware("picture"), eventsController.createEvents)
eventsRouter.patch("/:id", uploadMiddleware("picture"), eventsController.updateEvents)
eventsRouter.delete("/:id", eventsController.deleteEvents)


module.exports = eventsRouter
