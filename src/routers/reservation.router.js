const reservationRouter = require ("express").Router()
// const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
const reservationController = require("../controllers/reservation.controller")

reservationRouter.post("/", uploadMiddleware("picture"), reservationController.createreservations)

module.exports = reservationRouter
