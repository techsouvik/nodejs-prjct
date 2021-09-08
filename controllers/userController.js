const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
router.use(express.static("public"))
const newUser = mongoose.model('Users')
const newItem = mongoose.model('Items')
router.post('/',(req,res)=>{
     const user = new newUser()
     console.log(req.body)
     user.uname = req.body.uname
     user.pwd = req.body.pwd
     user.mail_id = req.body.mail_id
     user.gender = req.body.gender
     user.dob = req.body.dob
     user.contact_no = req.body.conatct_no
     user.save((err,data)=>{
          if(!err){
               console.log("Database Saved Succesfully")
               res.render('register',{data:user,msg:1})
          }
          else
               console.log(err)    
     })
})

router.post('/login',(req,res)=>{
     uname = req.body.uname
     pwd = req.body.pwd
     query = { $and : [{mail_id : uname}, {pwd : pwd}]}
     newUser.find(query).then((result) =>{
          console.log(result)
          res.redirect("/user/it")
     }).catch((err)=>{
          console.log(err)
     })
})
router.get("/it",(req,res)=>{
     newItem.find((err,data)=>{
                    if(!err){
                         res.render('dashboard',{data:data})
                    }
               })  
})
module.exports = router