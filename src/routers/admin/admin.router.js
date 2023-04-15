const admin = require("express").Router()

admin.use("/users", require("./users.router"))
admin.use("/profile", require("./profile.router"))
admin.use("/events", require("./events.router"))
admin.use("/categories", require("./categories.router"))
admin.use("/cities", require("./cities.router"))
admin.use("/paymentMethod", require("./paymentMethod.router"))
admin.use("/patners", require("./patners.router"))
admin.use("/reservationSection", require("./reservationSection.router"))
admin.use("/reservationStatus", require("./reservationStatus.router"))

module.exports = admin
