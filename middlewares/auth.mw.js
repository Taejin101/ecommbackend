const user_model = require('../models/user.model')
const jwt = require('jsonwebtoken')
const auth_config = require('../configs/auth.config')

const verifySignUpBody = async (req, res, next) => {
    try {
        // check for name
        if(!req.body.name) {
            return res.status(400).send({
                message : "Failed! Name was not provided"
            })
        }

        // check for email
        if(!req.body.email) {
            return res.status(400).send({
                message : "Failed! Email was not provided"
            })
        }

        // check for userid
        if(!req.body.userid) {
            return res.status(400).send({
                message : "Failed! userid was not provided"
            })
        }

        // check if user id is already present
        const user = await user_model.findOne({userid: req.body.userid})
        if(user) {
            return res.status(400).send({
                message : "Failed! userid already exists"
            })
        }

        // check for password
        if(!req.body.password) {
            return res.status(400).send({
                message : "Failed! password was not provided"
            })
        }

        next()
    }
    catch(err) {
        console.log("Error while validating the request object", err)
        return res.status(500).send({
            message : "Error while validating the request body"
        })
    }
}


const verifyToken = (req, res, next) => {

    // check if the token is present in the header
    const token = req.header('x-access-token')

    if(!token) {
        return res.status(403).send({
            message : "No token found : unauthorized"
        })
    }

    // check if it's a valid token
    jwt.verify(token, auth_config.secret, async (err, decoded)=>{
        if(err) {
            return res.status(401).send({
                message : "Unauthorized"
            })
        }

        const user = await user_model.findOne({userid : decoded.id})
        if(!user) {
            return res.status(400).send({
                message : "Unauthorized! User for this token doesn't exists"
            })
        }

        req.user = user
        next()
    })

    // then move to next step
}

const verifySignInBody = (req, res, next) => {

    // check for userid
    if(!req.body.userid) {
        return res.status(400).send({
            message : "Failed! userid was not provided"
        })
    }

    // check for password
    if(!req.body.password) {
        return res.status(400).send({
            message : "Failed! password was not provided"
        })
    }

    next()
}

const isAdmin = (req, res, next) => {

    const user = req.user

    if(user && user.usertype == "ADMIN") {
        next()
    }
    else {
        return res.status(403).send({
            message : "Only admin users are allowed to access this endpoint"
        })
    }

}

module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}