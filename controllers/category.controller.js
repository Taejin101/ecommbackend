
const category_model = require('../models/category.model')


exports.createNewCategory = async (req, res) => {
    // read the req body
    // create the category object
    const cat_data = {
        name : req.body.name,
        description : req.body.description
    }

    // insert into mongodb
    try {
        const category = await category_model.create(cat_data)
        res.status(201).send(category)
    }
    catch(err) {
        console.log("Error while creating category", err)
        return res.status(500).send({
            message : "Error while creating the category" 
        })
    }

    // return the response of created category
}