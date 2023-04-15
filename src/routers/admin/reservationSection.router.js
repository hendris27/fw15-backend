const reservationSectionRouter = require ("express").Router()

const reservationSectionController =require("../../controllers/admin/reservationSection.controller")
// const validate = require("../../middlewares/validator.middleware")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

reservationSectionRouter.get("/", reservationSectionController.getAllreservationSection)
reservationSectionRouter.get("/:id", reservationSectionController.getOnereservationSection)
reservationSectionRouter.post("/", reservationSectionController.createreservationSection)
reservationSectionRouter.patch("/:id",  reservationSectionController.updatereservationSection)
reservationSectionRouter.delete("/:id",  reservationSectionController.deletereservationSection)


module.exports = reservationSectionRouter
