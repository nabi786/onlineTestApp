const modal = require("../modal/modal");
const bcrypt = require("bcrypt")
// creating questions
//
//
//  FUNCTNO TO CREATE QUESTIONs
//
// ///////
const createQuestions = async (req, res) => {
  try {
    // console.log(req.user)
    if (!req.body.question || !req.body.options || !req.body.answer) {
      res.status(500).json({ success: false, msg: "invalid payload" });
    }

    // creating object
    if (req.user.role == "admin") {
      var optionsAry = req.body.options;

      var obj = [];
      optionsAry.forEach((item, index) => {
        obj.push({ value: item });
      });

      var newQuestion = new modal.questions({
        question: req.body.question,
        options: obj,
        answer: req.body.answer,
      });

      // saving data to db
      await newQuestion.save();
      // sending response
      res
        .status(200)
        .json({ success: true, msg: "question added Successfully" });
    } else {
      res
        .status(404)
        .json({ success: true, msg: "only admin has access to add qustions" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.msg });
  }
};

// getQuestions
const getQuestionsForTest = async (req, res) => {
  try {
    var questions = await modal.questions.find();
    if (questions.length > 0) {
      var array = [];
      questions.forEach((item, index) => {
        item.answer = "*";
        array.push(item);
      });

      const randomItems = getRandomItemsFromArray(array, "60");
      res.status(200).json({ success: true, data: randomItems });
    } else {
      res.status(200).json({ success: false, data: [], msg: "no test found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: err.msg });
  }
};

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

//   Get question's Answers by ID
const getAnswers = async (req, res) => {
  try {
    var array = req.body.idsArry;
    var correct_answers = 0;
    var wrong_anserwers = 0;

    var questionsByID = await modal.questions.find();

    if (questionsByID.length > 0) {
      var percentage_of_each_question = 100 / 60;

      console.log("percentage_of_each_question ", percentage_of_each_question);

      var matchedAry = [];
      questionsByID.forEach((item, index) => {
        array.forEach((item2, index2) => {
          // console.log(item2)
          if (item.id === item2.id) {
            matchedAry.push(item);
            var options = item.options;
            var answer = item.answer;
            options_ary = [];
            options.forEach((item3, index3) => {
              options_ary.push(item3.value);
            });

            // console.log(options_ary)
            var find_index = options_ary.indexOf(answer);
            console.log(find_index);
            console.log("answer ", answer);
            console.log("My option ", Number(item2.option));
            if (find_index === Number(item2.option)) {
              correct_answers++;
            } else {
              wrong_anserwers++;
            }
          }
        });
      });

      console.log("correct Answr ", correct_answers);
      console.log("wrong_anserwers ", wrong_anserwers);

      var total_percetange = percentage_of_each_question * correct_answers;
      total_percetange = total_percetange.toFixed(2);

      res
        .status(200)
        .json({
          success: true,
          data: matchedAry,
          correct_answers,
          wrong_anserwers,
          percentage: total_percetange,
        });
    } else {
      res
        .status(200)
        .json({ success: false, data: [], msg: "no question found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.msg });
  }
};




// admin can edit the user's Detials

const edit_user = async (req, res) => {
  try {
    if (!req.body.userID) {
      res.status(404).json({ success: false, msg: "invalid creidtionals" });
    }

    // var
    var admin = req.user;
    console.log("admin ", admin);
    if (admin.role === "admin") {
      var user = await modal.users.findOne({ _id: req.body.userID });
    //   console.log(user)

      if (user) {

        var hashed = await bcrypt.hash(req.body.password , 10)
        await modal.users.findOneAndUpdate({_id : req.body.userID},{
            firstName : req.body.fname,
            lastName : req.body.lname,
            email : req.body.email,
            password : hashed,
        })



         res.status(200).json({ success: true, msg : "user updated successfully"});
      } else {
        res.status(404).json({ success: false, msg: "no any user found" });
      }
    } else {
      res
        .status(404)
        .json({ success: false, msg: "only admin can edit the user" });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, msg: err.msg });
  }
};




// get all User

const get_all_users = async (req, res) => {
  try {
    var admin = req.user;
    console.log("admin ", admin);
    if (admin.role === "admin") {

          var users = await modal.users.find({role : "user"})
        
          if(users){


              res.status(200).json({ success: true, users });
            }else{
                
                res.status(404).json({ success: false, msg : "no user found" });
          }
    } else {
      res
        .status(200)
        .json({ success: true, msg: "only admin can access all users" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.msg });
  }
};

const obj = { createQuestions, getQuestionsForTest, getAnswers, edit_user , get_all_users };

module.exports = obj;
