const historyRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
const historyController = require("../controllers/history.controller")

historyRouter.get("/", historyController.gethistory)
historyRouter.get("/:id", historyController.getDetailhistory)

module.exports = historyRouter
