
const bcrypt = require('bcryptjs')
const user_model = require('../models/user.model')

exports.signup = async (req, res) => {
    /*
    * 1. Read the req body
    * 2. Insert the data in users collection in mongodb
    */

    const request_body = req.body;

    console.log(request_body)

    const userObj = {
        name : request_body.name,
        userid : request_body.userid,
        email : request_body.email,
        usertype : request_body.usertype,
        password : bcrypt.hashSync(request_body.password, 8)
    }

    try {
        const user_created = await user_model.create(userObj)
        const res_obj = {
            name : user_created.name,
            userid : user_created.userid,
            email : user_created.email,
            usertype : user_created.usertype,
            createdAt : user_created.createdAt,
            updatedAt : user_created.updatedAt
        }
        res.status(201).send(res_obj)
    }
    catch(err) {
        res.status(500).send({
            message : "Some error occurred while registering the user"
        })
    }
}