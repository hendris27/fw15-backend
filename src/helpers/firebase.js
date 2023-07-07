var admin = require("firebase-admin")
var serviceAccount = require("../../event-app-e11a2-firebase-adminsdk-72mau-9bcb1dad94.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
module.exports = admin
