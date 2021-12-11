const User = require('../modules/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = (req,res,next)=>{
    bcrypt.hash(req.body.password,10 , function(err , hashedpass){
        if(err){
            res.json({
                errpr:err
            })
        }
        let user = new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedpass
        })
    
        user.save()
        .then(response => {
            res.json({
                message:"Employee account Successfully"
            })
        })
        .catch(error => {
            res.json({
                message:"An error Occured"
            })
        })
    })
}

const login = async (req,res,next)=>{
    var username = req.body.username
    var password = req.body.password
     
    try{
        const user = await  User.findOne({
            email:username 
        })   
         !user && res.status(404).json("user not found")
         
        const validpassword =  await bcrypt.compare(password , user.password)
        !validpassword && res.status(400).json("wrong password")
        let token = jwt.sign({name:user.name} , 'verySecrectValue' , {expiresIn:'1h'})
        res.json({
         message:'LogIn Successfull',
              token
         })


        }catch(err){
            console.log("something went wrong")
        }
       
}


// route.post("/login",async (req,res)=>{
//     try{
//     const user = await  User.findOne({
//         email:req.body.email 
//     })   
//      !user && res.status(404).json("user not found")
     
//     const validpassword =  await bcrypt.compare(req.body.password , user.password)
//     !validpassword && res.status(400).json("wrong password")
    
//     res.status(200).json(user)
//     }catch(err){
//         console.log("something went wrong")
//     }
// })



// User.findOne({$or:[{email:username} ,{phone:username} ]}).then(user => {
    //         if(user){
    //             user.compare(password,user.password , function(err , result){
    //                 if(err){
    //                   res.json({
    //                       error :err
    //                   })
    //                 }
                  
    //                 if(result){
    //                     let token = jwt.sign({name:user.name} , 'verySecrectValue' , {expiresIn:'1h'})
    //                     res.json({
    //                         message:'LogIn Successfull',
    //                         token
    //                     })
    //                 }else{
    //                     res.json({
    //                         message:"password does not match"
    //                     })
    //                 }
    
    
    //             })
    //         }
    //     })
    //     .catch((err)=>{
    //         res.json({
    //             message:"no user match"
    //         })
    //     })




module.exports={
    register , login
}