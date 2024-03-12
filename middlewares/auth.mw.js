const user_model = require('../models/user.model')

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

module.exports = {
    verifySignUpBody : verifySignUpBody
}