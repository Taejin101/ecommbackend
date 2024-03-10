const mongoose = require('mongoose')

/*
* name
* userid
* password
* email
* usertype
*/

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    userid : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    usertype : {
        type : String,
        default : 'CUSTOMER',
        enum : ['CUSTOMER', 'ADMIN']
    }

}, {timestamps : true, versionKey : false})

module.exports = mongoose.model("User", userSchema)