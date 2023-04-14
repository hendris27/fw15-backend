const admin = require("express").Router()

admin.use("/users", require("./users.router"))
admin.use("/profile", require("./profile.router"))
admin.use("/events", require("./events.router"))

module.exports = admin
