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
    }},
  { timestamps: true }
  
);


var users = mongoose.model("user", userSchema);

const modal = {users}
module.exports = modal