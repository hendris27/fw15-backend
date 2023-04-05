exports.getAllUsers= (request, response)=>{
    const data =[
        {
            name : "bobo",
            phone :"089292929919"
        }
    ]


    return response.json({
        succes : true,
        message : "list of all users",
        results : data
    })
}
exports.createUser =(request, response) =>{
    return response.json({
        succes: true,
        message:"create user succesfully"
    })
}

exports.updateUser =(request, response) =>{
    return response.json({
        succes: true,
        message:`Update user  ${request.params.id}succesfully`
    })
}

exports.deleteUser =(request, response) =>{
    return response.json({
        succes: true,
        message:`delete user${request.params.id} succesfully`
    })
}
