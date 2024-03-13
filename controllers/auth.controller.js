
const bcrypt = require('bcryptjs')
const user_model = require('../models/user.model')
const jwt = require('jsonwebtoken')
const secret = require('../configs/auth.config')

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


exports.signin = async (req, res) => {

    // check if user id is present in the system
    const user = await user_model.findOne({userid : req.body.userid})

    if(user == null) {
        return res.status(400).send({
            "message" : "userid is not present"
        })
    }

    // password is correct
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)

    if(!isPasswordValid) {
        return res.status(401).send({
            "message" : "Incorrect password"
        })
    }

    // using jwt we will create an access token with a given TTL and return
    const token = jwt.sign({id : user.userid}, secret.secret, {
        expiresIn : 120
    })

    return res.status(200).send({
        name : user.name,
        userid : user.userid,
        email : user.email,
        usertype : user.usertype,
        accesstoken : token
    })
}