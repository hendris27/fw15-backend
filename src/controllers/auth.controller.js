const userModel = require("../models/users.model")
const profileModel = require("../models/profile.model")
const forgotRequestModel = require("../models/forgotRequest.model")
const errorHandler = require("../helpers/errorHandler.helper")
const jwt = require("jsonwebtoken")
const { APP_SECRET } = process.env
const argon = require("argon2")

exports.register = async (request, response) => {
  try {
    const { fullName, password, confirmPassword } = request.body
    if (password !== confirmPassword) {
      throw Error("password unmatch")
    }

    const hash = await argon.hash(password)
    const data = {
      ...request.body,
      password: hash
    }
    const user = await userModel.insert(data)
    const profileData = {
      fullName,
      userId: user.id
    }

    await profileModel.insert(profileData)
    const token = jwt.sign({ id: user.id }, APP_SECRET)
    return response.json({
      succes: true,
      message: "Register Succes",
      results: { token }
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}
exports.login = async (request, response) => {
  try {
    const { email, password } = request.body
    const user = await userModel.findOneByEmail(email)
    if (!user) {
      throw Error("wrong_credentials")
    }
    const verify = await argon.verify(user.password, password)
    if (!verify) {
      throw Error("wrong_credentials")
    }
    const token = jwt.sign({ id: user.id }, APP_SECRET)
    return response.json({
      succes: true,
      message: "Login Succes",
      results: { token }
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.forgotPassword = async (request, response) => {
  try {
    const { email } = request.body
    const user = await userModel.findOneByEmail(email)
    if (!user) {
      throw Error("User Not Found!")
    }
    const randomNumber = Math.random()
    const rounded = Math.round(randomNumber * 100000)
    const padded = String(rounded).padEnd(6, "0")

    const forgot = await forgotRequestModel.insert({
      email: user.email,
      code: padded
    })
    if (!forgot) {
      throw Error("forgot_failed")
    }
    return response.json({
      succes: true,
      message: "Request reset password succes"
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.resetPassword = async (request, response) => {
  try {
    const { code, email, password } = request.body
    const find = await forgotRequestModel.findOneBycodeAndEmail(code, email)
    if (!find) {
      throw Error("no_find_forgot_password_request")
    }
    const selectedUser = await userModel.findOneByEmail(email)
    const data = {
      password: await argon.hash(password)
    }
    const user = await userModel.update(selectedUser.id, data)
    if (!user) {
      throw Error("no_forgot_password_request")
    }
    await forgotRequestModel.destroy(find.id)
    return response.json({
      succes: true,
      message: "reset password succes"
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}
