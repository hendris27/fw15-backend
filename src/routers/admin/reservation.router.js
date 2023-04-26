const reservationRouter = require ("express").Router()

const reservationController =require("../../controllers/admin/reservation.controller")
const validate = require("../../middlewares/validator.middleware")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

reservationRouter.get("/",validate("getAll"), reservationController.getAllreservation)
reservationRouter.get("/:id", validate("idParams"),reservationController.getOnereservation)
reservationRouter.post("/", validate("createReservation"), reservationController.createreservation)
reservationRouter.patch("/:id", validate("updateReservation"),validate("idParams"), reservationController.updatereservation)
reservationRouter.delete("/:id", validate("idParams"), reservationController.deletereservation)


module.exports = reservationRouter
