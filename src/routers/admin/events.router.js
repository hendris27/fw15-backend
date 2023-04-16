const eventsRouter = require ("express").Router()

const eventsController =require("../../controllers/admin/events.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")

eventsRouter.get("/", validate("getAll"),eventsController.getAllEvents)
eventsRouter.get("/:id", validate("idParams"),eventsController.getOneEvents)
eventsRouter.post("/", uploadMiddleware("picture"),validate("createUpdateEvent"), eventsController.createEvents)
eventsRouter.patch("/:id", uploadMiddleware("picture"),validate("createUpdateEvent"),validate("idParams"), eventsController.updateEvents)
eventsRouter.delete("/:id",validate("idParams"), eventsController.deleteEvents)


module.exports = eventsRouter
