const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const routes = require('./routes/user-and-test-routes')

dotenv.config()
const server = express()

server.use(cors())
server.use(express.json())
server.use(routes)

// change PROD_DB_NAME to DEV_DB_NAME while developing
mongoose.connect(
    `mongodb://0.0.0.0:27017/${process.env.PROD_DB_NAME}`
).then(()=>{
    server.listen(process.env.PORT || 3000)
    console.log("Success")
}).catch((err) => {
    console.log("Unable to connect to server: " + err)
})