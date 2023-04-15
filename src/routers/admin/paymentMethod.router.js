const paymentMethodRouter = require ("express").Router()

const paymentMethodController =require("../../controllers/admin/paymentMethod.controller")
// const validate = require("../../middlewares/validator.middleware")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

paymentMethodRouter.get("/", paymentMethodController.getAllpaymentMethod)
paymentMethodRouter.get("/:id", paymentMethodController.getOnepaymentMethod)
paymentMethodRouter.post("/", paymentMethodController.createpaymentMethod)
paymentMethodRouter.patch("/:id",  paymentMethodController.updatepaymentMethod)
paymentMethodRouter.delete("/:id",  paymentMethodController.deletepaymentMethod)


module.exports = paymentMethodRouter
