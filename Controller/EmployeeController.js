const { model } = require('mongoose');
const Employee = require('../modules/Employee');

// show the list of the Employee

const index = (req,res,next)=>{
    Employee.find()
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message:"An error Occured"
        })
    })
}

// show single Employee

const show = (req,res,next) => {
    let employeeId = req.body.employeeId
    Employee.findById(employeeId)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message:"An error Occured"
        })
    })
}

// store data in Mongodb

  const store = (req,res,next) => {
      let employee = new Employee({
          name:req.body.name,
          desigation:req.body.desigation,
          email:req.body.email,
          phone:req.body.phone,
          age:req.body.age
      })
      if(req.file){
        employee.avatar = req.file.path
      }
      
    //    if(req.files){
    //        let path = ''
    //        req.files.forEach(function(files , index , arr){
    //            path = path + files.path + ','
    //        })
    //        path.substring(0,path.lastIndexOf(0))
    //        employee.avatar = path
    //     //    use for multiple files
    //    }

    employee.save()
    .then(response => {
        res.json({
            // message:"Employee Added Successfully",
            response
        })
    })
    .catch(error => {
        res.json({
            message:"An error Occured"
        })
    })
}


// update an employee

  const update = (req,res,next) => {
      let employeeId = req.body.employeeId
      
       let updateddata = {
        name:req.body.name,
        desigation:req.body.desigation,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age           
       }
       Employee.findByIdAndUpdate(employeeId , {$set:updateddata})
       .then(()=>{
           res.json({
               message:"Successfully Updated"
           })
       })
       .catch(error => {
           res.json({
            message:"An error Occured"                             
           })
       })
  }

// delete an Employee

  const destroy = (req,res,next) => {
      let employeeId = req.body.employeeId
     Employee.findByIdAndRemove(employeeId)
     .then(()=>{
        res.json({
            message:"Successfully deleted"
        })
    })
    .catch(error => {
        res.json({
         message:"An error Occured"                             
        })
    })
  }



module.exports = {
    index,show , store , update , destroy
}