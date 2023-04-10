
const errorHandler = (err, response) => {

    if(err.message.includes("Cannot read properties of undefined (reading 'includes')")){
        return response.status(409).json({
            succes: false,
            message: "Error : input id invalid"
        })
    }

    if(err?.message?.includes("empty_field")){
        return response.status(400).json({
            succes: false,
            message:"Email or Password cannot be empty"
        })
    }

    if(err?.message?.includes("email_format")){
        return response.status(400).json({
            succes: false,
            message:"Wrong Email Format!"
        })
    }

    if(err?.message?.includes("password_format")){
        return response.status(400).json({
            succes: false,
            message:"Password must be more than 8 Character!"
        })
    }

    else if(err.message.includes("duplicate key")){
        return response.status(409).json({
            succes: false,
            message: "Error : email already used!"
        })
    }

    else if(err.message.includes("invalid input syntax for type integer")){
        return response.status(409).json({
            succes: false,
            message: "Error : input id wrong!"
        })}
    console.log(err)
    return response.status(500).json({
        succes: false,  
        message: "Error : Internal server error",
    })

}

module.exports = errorHandler
