const reservationStatusRouter = require ("express").Router()

const reservationStatusController =require("../../controllers/admin/reservationStatus.controller")
const validate = require("../../middlewares/validator.middleware")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

reservationStatusRouter.get("/", validate("getAll"),reservationStatusController.getAllreservationStatus)
reservationStatusRouter.get("/:id", validate("idParams"), reservationStatusController.getOnereservationStatus)
reservationStatusRouter.post("/", validate("createUpdaresStatus"),reservationStatusController.createreservationStatus)
reservationStatusRouter.patch("/:id", validate("createUpdaresStatus"),validate("idParams"), reservationStatusController.updatereservationStatus)
reservationStatusRouter.delete("/:id", validate("idParams"), reservationStatusController.deletereservationStatus)


module.exports = reservationStatusRouter
