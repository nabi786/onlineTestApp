const express = require('express')
const router = express.Router()
const obj = require("../controller/authControl")
const auth = require("../midleware/auth")


// register user
router.post("/register", obj.register)


// login user
router.post("/login", obj.loginUser)




router.get("/dashed_user",auth, obj.dash)






module.exports = router