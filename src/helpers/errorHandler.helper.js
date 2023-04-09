
const errorHandler = (err, response) => {

    if(err.message.includes("Cannot read properties of undefined (reading 'includes')")){
        return response.status(409).json({
            succes: false,
            message: "Error : input id invalid"
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
  
    return response.status(500).json({
        succes: false,  
        message: "Error : Internal server error",
    })

}

module.exports = errorHandler
