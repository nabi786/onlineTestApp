
const modal = require("../modal/modal")


// creating questions
// 
// 
//  FUNCTNO TO CREATE QUESTIONs
// 
// ///////
const createQuestions = async(req,res)=>{
    try{


        console.log(req.user)
        if(!req.body.question || !req.body.option1 || !req.body.option2 || !req.body.option3 || !req.body.answer){
            res.status(500).json({success : false, msg : "invalid payload"})
        }

        // creating object
        if(req.user.role == "admin"){

            var newQuestion = new modal.questions({
                question : req.body.question,
                option1 : req.body.option1,
                option2 : req.body.option2,
                option3 : req.body.option3,
                option4 : req.body.option4,
                answer : req.body.answer
            })

            // saving data to db 
            await newQuestion.save()
            // sending response
            res.status(200).json({success : true, msg : "question added Successfully"})
        }else{

            res.status(404).json({success : true, msg : "only admin has access to add qustions"})
        }
    }catch(err){
        res.status(500).json({success : false, msg : err.msg})
    }
}






// getQuestions

const getQuestionsForTest = async(req,res)=>{
    try{

    
    
        var questions = await modal.questions.find()

        var array = []
        questions.forEach((item,index)=>{
            item.answer = "*"
            array.push(item)
        })
        

        const randomItems = getRandomItemsFromArray(array, "3");

        res.status(200).json({success : false, data : randomItems})
    }catch(err){
        res.status(500).json({success : false, msg : err.msg})
    }
}






// get Radom questions function
function getRandomItemsFromArray(arr, count) {
    const shuffled = arr.slice(); // Copy the original array
    let i = arr.length;
    let temp, randomIndex;
  
    // Perform Fisher-Yates shuffle
    while (i--) {
      randomIndex = Math.floor((i + 1) * Math.random());
      temp = shuffled[randomIndex];
      shuffled[randomIndex] = shuffled[i];
      shuffled[i] = temp;
    }
  
    return shuffled.slice(0, parseInt(count));
  }
  

 


const obj = {createQuestions , getQuestionsForTest}


module.exports = obj