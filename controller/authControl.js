const modal = require('../modal/modal')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


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
                role : "user"
            })
            

            console.log("data ", newUser)

            await newUser.save()
            
            
            await loginUser(req,res)
        }else{
            res.status(200).json({success : false, msg : "account already exist with this email"})
        }
    }catch(err){
        res.status(500).json({success : false, msg : err.message})
    }
}




// login user 
const loginUser= async(req,res)=>{
    try{    


    if(!req.body.email || !req.body.password){
        res.status(500).json({success : false,msg : "invalid Creditionals"})
    }

    var findAcount = await modal.users.findOne({email : req.body.email})

    if(findAcount){
        var isMatch = await bcrypt.compare(req.body.password, findAcount.password)
        if(isMatch == true){

            var jwtPayLoad = {
                id : findAcount.id,
                firstName :  findAcount.firstName,
                lastName :  findAcount.lastName,
                email :  findAcount.email,
                role : findAcount.role,  
            }
            // json expire data
            const jwtData = {
                expiresIn: process.env.JWT_TIMEOUT_DURATION,
              };
            //   generating tokne
            var token = jwt.sign(jwtPayLoad, process.env.JWT_SECRET_KEY, jwtData)
            // adding token to data
            jwtPayLoad.token = token;
            
            // console.log(findAcount)
            res.status(200).json({success : true, data : jwtPayLoad})
        }else{
            
            res.status(404).json({success : false, msg : "invalid email or password"})
        }
        
    }else{
        res.status(404).json({success : false, msg : "invalid email or password"})

    }

    }catch(err){
        res.status(500).json({success : false, msg : err.message})
    }
}



// exporting object
const obj = {register , loginUser}


module.exports = obj