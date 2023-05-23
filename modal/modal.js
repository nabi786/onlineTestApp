var mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    firstName: { 
        type: String ,
        required : true 
    },
    lastName: { 
        type: String,
        required : true  
    },
    email: { 
        type: String,
        required : true 
    },
   
    password : {
        type : String ,
        required : true 
    },
    role : {
      type : String,
      required : true
    }
  },
    
  { timestamps: true }
  
);



// question Schema
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [{type : Object, required : true}],
    answer: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

// 
var users = mongoose.model("user", userSchema);
var questions = mongoose.model("questions", questionSchema);


// create object
const modal = {users , questions}

// exporing model
module.exports = modal