
const errorHandler = (err, response) => {

    if(err===undefined){
        return response.status(400).json({
            succes: false,
            message:"Error:user not found"
        })
    }
    if(err?.message?.includes("empty_field")){
        return response.status(400).json({
            succes: false,
            message:"Email or Password or Name cannot be empty"
        })
    }
    if(err?.message?.includes("not_same_format")){
        return response.status(400).json({
            succes: false,
            message:"name or password don't same"
        })
    }
    if(err?.message?.includes("email_format")){
        return response.status(400).json({
            succes: false,
            message:"Wrong Email Format!"
        })
    }
    if(err?.message?.includes("name_format")){
        return response.status(400).json({
            succes: false,
            message:"Wrong Name Format!"
        })
    }
    if(err?.message?.includes("password_format")){
        return response.status(400).json({
            succes: false,
            message:"Password must be more than 5 Character!"
        })
    }
    if(err?.message?.includes("password_symbol_format")){
        return response.status(400).json({
            succes: false,
            message:"Password must be include Symbol!"
        })
    }
    if(err.message.includes("duplicate key")){
        return response.status(409).json({
            succes: false,
            message: "Error : email already used!"
        })
    }
    if(err?.message?.includes("name_format")){
        return response.status(400).json({
            succes: false,
            message:"Wrong Email Format!"
        })
    }
    if(err.message.includes("Cannot read properties of undefined (reading 'includes')")){
        return response.status(409).json({
            succes: false,
            message: "Error : input id invalid"
        })
    }
    if(err.message.includes("invalid input syntax for type integer")){
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
