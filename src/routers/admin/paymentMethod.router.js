const paymentMethodRouter = require ("express").Router()

const paymentMethodController =require("../../controllers/admin/paymentMethod.controller")
const validate = require("../../middlewares/validator.middleware")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

paymentMethodRouter.get("/",validate("getAll"), paymentMethodController.getAllpaymentMethod)
paymentMethodRouter.get("/:id",validate("idParams"), paymentMethodController.getOnepaymentMethod)
paymentMethodRouter.post("/",validate("createUpdaPaymentMethod"), paymentMethodController.createpaymentMethod)
paymentMethodRouter.patch("/:id", validate("createUpdaPaymentMethod"),validate("idParams"), paymentMethodController.updatepaymentMethod)
paymentMethodRouter.delete("/:id", validate("idParams"), paymentMethodController.deletepaymentMethod)


module.exports = paymentMethodRouter
