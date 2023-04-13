const { body, query, param, validationResult } = require ("express-validator")
// const errorHandler = require("../helpers/errorHandler.helper")

const strongPasword =  body("password").isStrongPassword().withMessage("Password must be strong")
const emailFormat =   body("email").isEmail().withMessage ("Email is invalid")

const rules = {
    authLogin: [
        emailFormat,
        body ("password").isLength({min:1}).withMessage("Name length is invalid")
    ],
    createUser:[
        body("fullName").isLength({min:3, max :80}).withMessage ("Name is length invalid"),
        emailFormat,
        strongPasword
    ],
    updateUser:[
        body("fullName").isLength({min:3, max :80}).withMessage ("Name is length invalid"),
        emailFormat,
        strongPasword
    ],
    getAllUsers:[
        query("sortBy").isIn(["ASC", "DESC"]).withMessage("Sortby type is invalid")
    ],
    idParams:[
        param("id").toInt().isDecimal().withMessage("id is invalid")
            .isInt({min: 1}).withMessage("ID have to be more than 0")
    ]
}

const validator = (request, response, next) => {
    const errors = validationResult(request)
    try{
        if(!errors.isEmpty()){
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
