const express = require("express")
const router = express.Router()
const obj = require("../controller/admin_Control")

const auth = require("../midleware/auth")

// create questions
router.post("/create_Questions",auth, obj.createQuestions)

// get question without answer
router.get("/getQuestionsForTest",auth, obj.getQuestionsForTest)


// get answer of question
router.post("/getAnswers",auth, obj.getAnswers)



// edit users 
router.patch("/edit_user",auth, obj.edit_user)

// get all User
router.get("/get_all_users",auth, obj.get_all_users)




module.exports = router