const express = require('express')
const mongoose = require('mongoose')
const server_config = require('./configs/server.config')
const db_config = require('./configs/db.config')
const user_model = require('./models/user.model')
const bcrypt = require('bcryptjs')

const app = express()

app.use(express.json())

mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on('error', ()=> {
    console.log('Error while connecting to mongodb')
})

db.once('open', ()=> {
    console.log('Connected to mongodb')
    init()
})


async function init() {
    try {
        let user = await user_model.findOne({userid : 'admin'})

        if(user) {
            console.log("Admin is already present")
            return
        }
    }
    catch(err) {
        console.log("Error while reading data", err)
    }

    try {
        user = await user_model.create({
            name : 'Ishan',
            userid : 'admin',
            password : bcrypt.hashSync('Welcome1', 8),
            email : 'ishanjoshiian@gmail.com',
            usertype : 'ADMIN'
        })

        console.log("Admin created ", user)
    }
    catch(err) {
        console.log("Error while creating admin", err)
    }
     
}


/**
 * Stitch the routes to the server
 */
require('./routes/auth.routes')(app)


app.listen(server_config.PORT, ()=>{
    console.log('Server running at port no :', server_config.PORT)
})