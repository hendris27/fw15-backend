const eventCategoriesRouter = require ("express").Router()

const eventCategoriesController =require("../../controllers/admin/eventCategories.controller")
const validate = require("../../middlewares/validator.middleware")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

eventCategoriesRouter.get("/", validate("getAll"),eventCategoriesController.getAlleventCategories)
eventCategoriesRouter.get("/:id",validate("idParams"), eventCategoriesController.getOneeventCategories)
eventCategoriesRouter.post("/",validate("createEventCat"), eventCategoriesController.createeventCategories)
eventCategoriesRouter.patch("/:id",  validate("idParams"),validate("updateEventCat"),eventCategoriesController.updateeventCategories)
eventCategoriesRouter.delete("/:id", validate("idParams"),eventCategoriesController.deleteeventCategories)


module.exports = eventCategoriesRouter
