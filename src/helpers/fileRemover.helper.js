const fs = require("fs")


const fileRemover = (file) => {
  if(file){
    const filename = `uploads/${file.filename}`
    fs.unlink(filename, (err) =>{
      try{
        if(err){
          throw Error(err.message)
        }
      }catch (error){
        console.log (error)
      }
    })
  }
}
module.exports = fileRemover
