const express = require('express')
const router = express.Router()
const obj = require("../controller/authControl")



// register user
router.post("/register", obj.register)


// login user



module.exports = router