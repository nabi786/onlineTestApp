const modal = require('../modal/modal')
const bcrypt = require("bcrypt")


// resgister function 

const register= async(req,res)=>{
    try{

       

        if(!req.body.firstName || !req.body.email || !req.body.password || !req.body.lastName){
            res.status(500).json({msg : "invalid Creditionals", success : false})
        }
        console.log('function working')

        var findAccount = await modal.users.findOne({email : req.body.email})
        if(!findAccount){

            var password = await bcrypt.hash(req.body.password , 10)

            var newUser = new modal.users({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password : password,
            })
            

            console.log("data ", newUser)

            await newUser.save()
            res.status(200).json({success : false, msg : "registered Successfully"})
        }else{
            res.status(200).json({success : false, msg : "account already exist with this email"})
        }
    }catch(err){
        res.status(500).json({success : false, msg : err.message})
    }
}






const obj = {register}


module.exports = obj