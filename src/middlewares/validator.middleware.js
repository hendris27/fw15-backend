const { body, query, param, validationResult } = require ("express-validator")
const fileRemover = require("../helpers/fileRemover.helper")
// const errorHandler = require("../helpers/errorHandler.helper")


const strongPasword =  body("password").isStrongPassword().withMessage("Password must be strong")
const emailFormat =   body("email").isEmail().withMessage ("Email format is invalid")
const eventId = body("eventId").isNumeric().withMessage("eventId is invalid")
    .isInt({min:1}).isNumeric().withMessage("eventId have to be more than 0")
const userId = body("userId").optional().isNumeric().withMessage("userId is invalid").isInt({min:1}).withMessage("userId have to be more than 0")
const name = body("name").isLength({min:3, max :20}).withMessage ("username is length invalid")



const rules = {
    authLogin: [
        emailFormat,
        body ("password").isLength({min:1}).withMessage("Password length is invalid")
    ],
    createUser:[
        body("username").isLength({min:3, max :20}).withMessage ("username is length invalid"),
        emailFormat,
        strongPasword
    ],
    createUpdateName:[
        name
    ],
    createUpdateeventCat:[
        eventId,
        body("categoryId").isNumeric().withMessage("categoryId is invalid").isInt({min:1}).withMessage("categoryId have to be more than 0")
    ],
    createUpdatewishlist:[
        eventId,
        userId
    ],
    createUpdareservation:[
        eventId,
        userId,
        body("status").isNumeric().withMessage("Status is invalid").isInt({min:1}).withMessage("Status have to be more than 0"),
        body("paymentMethodId").isNumeric().withMessage("paymaentMethodId is invalid").isInt({min:1}).withMessage("ID have to be more than 0") 
    ],
    createUpdaresTickets:[
        body("reservationId").isNumeric().withMessage("reservationId is invalid").isInt({min:1}).withMessage("reservationId have to be more than 0"),
        body("sectionId").isNumeric().withMessage("sectionId is invalid").isInt({min:1}).withMessage("sectionId have to be more than 0"),
        body("quantity").isNumeric().withMessage("Quantity is invalid").isInt({min:1}).withMessage("Quantity have to be more than 0")
    ],
    createUpdateEvent:[
        body("tittle").isLength({min:3, max :20}).withMessage ("tittle is length invalid"),
        body("date").isDate({format: "DD-MM-YYYY"}).withMessage("date format is invalid"),
        body("cityId").isNumeric().withMessage("cityId is invalid").isInt({min:1}).withMessage("cityId have to be more than 0"),
        body("descriptions").isLength({min:3, max :20}).withMessage ("Descriptions is length invalid")
    ],
    UpdateProfil:[
        body("fullName").optional().isLength({min:3, max :20}).withMessage ("fullName is length invalid"),
        body("phoneNumber").optional().isNumeric().toInt().withMessage("phoneNumber is invalid"),
        // body("gender").isBoolean().withMessage("Gender must be a boolean value"),
        body("gender").optional().isString().withMessage("Gender must be a string value").custom((value) => {
            if (value.toLowerCase() === "male" || value.toLowerCase() === "female") {
                return true 
            }
            throw new Error("Invalid gender value")
        }),
        body("profession").optional().isLength({min:3, max :20}).withMessage ("profession is length invalid"),
        body("nationality").optional().isLength({min:3, max :20}).withMessage ("Nationality is length invalid"),
        body("birthDate").optional().isDate({format: "DD-MM-YYYY"}).withMessage("birthDate format is invalid"),
        userId
    ],
    createProfil:[
        body("fullName").isLength({min:3, max :20}).withMessage ("fullName is length invalid"),
        body("phoneNumber").isNumeric().toInt().withMessage("phoneNumber is invalid"),
        // body("gender").isBoolean().withMessage("Gender must be a boolean value"),
        body("gender").isString().withMessage("Gender must be a string value").custom((value) => {
            if (value.toLowerCase() === "male" || value.toLowerCase() === "female") {
                return true 
            }
            throw new Error("Invalid gender value")
        }),
        body("profession").isLength({min:3, max :20}).withMessage ("profession is length invalid"),
        body("nationality").isLength({min:3, max :20}).withMessage ("Nationality is length invalid"),
        body("birthDate").isDate({format: "DD-MM-YYYY"}).withMessage("birthDate format is invalid"),
        userId
    ],
    createUpdaresStatus:[
        name
    ],
    createUpdaPaymentMethod:[
        name
    ],
    updateUser:[
        body("username").isLength({min:3, max :20}).withMessage ("username is length invalid"),
        emailFormat,
        strongPasword
    ],
    getAll:[
        query("sortBy").toUpperCase().isIn(["ASC", "DESC"]).withMessage("Sortby type is invalid")
    ],
    idParams:[
        param("id").isNumeric().toInt().isDecimal().withMessage("id is invalid")
            .isInt({min: 1}).withMessage("ID have to be more than 0")
    ],
    resetPassword:[
        body ("confirmPassword").custom((value, {req}) => {
            return value === req.body.password
        }).withMessage("Confrim password unmatch")
    ]
}

const validator = (request, response, next) => {
    const errors = validationResult(request)
    try{
        
        if(!errors.isEmpty()){
            fileRemover(request.file)
            // return response.status(400).json({ errors:errors.array() })
            throw Error ("validator")
        }
        return next()
    }
    catch (err) {
        // if (err) return errorHandler(err, response)
        return response.status(400).json({
            succes : false,
            message: "validation  Error",
            results : errors.array()

        })
    }
 
}
const validate = (selectedRules) => [rules[selectedRules], validator]

module.exports =validate
