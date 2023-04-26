const reservationSectionRouter = require ("express").Router()

const reservationSectionController =require("../../controllers/admin/reservationSection.controller")
const validate = require("../../middlewares/validator.middleware")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

reservationSectionRouter.get("/", validate("getAll"), reservationSectionController.getAllreservationSection)
reservationSectionRouter.get("/:id", validate("idParams"),reservationSectionController.getOnereservationSection)
reservationSectionRouter.post("/", validate("createResSection"), reservationSectionController.createreservationSection)
reservationSectionRouter.patch("/:id", validate("updateResSection"),validate("idParams"), reservationSectionController.updatereservationSection)
reservationSectionRouter.delete("/:id", validate("idParams"), reservationSectionController.deletereservationSection)


module.exports = reservationSectionRouter
