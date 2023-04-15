const reservationStatusRouter = require ("express").Router()

const reservationStatusController =require("../../controllers/admin/reservationStatus.controller")
// const validate = require("../../middlewares/validator.middleware")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

reservationStatusRouter.get("/", reservationStatusController.getAllreservationStatus)
reservationStatusRouter.get("/:id", reservationStatusController.getOnereservationStatus)
reservationStatusRouter.post("/", reservationStatusController.createreservationStatus)
reservationStatusRouter.patch("/:id",  reservationStatusController.updatereservationStatus)
reservationStatusRouter.delete("/:id",  reservationStatusController.deletereservationStatus)


module.exports = reservationStatusRouter
