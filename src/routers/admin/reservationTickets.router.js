const reservationTicketsRouter = require ("express").Router()

const reservationTicketsController =require("../../controllers/admin/reservationTickets.controller")
const validate = require("../../middlewares/validator.middleware")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

reservationTicketsRouter.get("/", validate("getAll"),reservationTicketsController.getAllreservationTickets)
reservationTicketsRouter.get("/:id", validate("idParams"),reservationTicketsController.getOnereservationTickets)
reservationTicketsRouter.post("/",validate("createResTickets") ,reservationTicketsController.createreservationTickets)
reservationTicketsRouter.patch("/:id", validate("updateResTickets"),validate("idParams"), reservationTicketsController.updatereservationTickets)
reservationTicketsRouter.delete("/:id", validate("idParams"),reservationTicketsController.deletereservationTickets)


module.exports = reservationTicketsRouter
