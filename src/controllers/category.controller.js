// const fileRemover = require("../helpers/fileRemover.helper")
const categoryModel = require("../models/categories.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.updateCategory = async (req, res) => {
    try{
        const {id} = req.user
        const data = {
            ...req.body
        }
      
   
        const category = await categoryModel.updateById(id, data)
        if(!category){
            throw Error ("update_category_failed")
        }

        return res.json({
            succes:true,
            message:"update category succesfully",
            results: category
        })
    } catch (err) {
        if (err) return errorHandler(err, res)
    }
 
}
