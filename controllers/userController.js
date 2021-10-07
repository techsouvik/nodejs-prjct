const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const session = require('express-session')
router.use(express.static("public"))
router.use(session({
     secret:'souvik',
     saveUninitialized:true,
     resave: false
}))
function uid(){
     let s = "V"+(Math.floor(1000 + Math.random() * 9000))
     return s
     }
let sess
const newUser = mongoose.model('Users')
const newVendor = mongoose.model('Vendors')
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
               res.render('users/register',{data:user,msg:1})
          }
          else
               console.log(err)    
     })
})

router.post('/v',(req,res)=>{
     const user = new newVendor()
     console.log(req.body)
     user.venid = uid()
     user.uname = req.body.uname
     user.pwd = req.body.pwd
     user.mail_id = req.body.mail_id
     user.gender = req.body.gender
     user.dob = req.body.dob
     user.contact_no = req.body.conatct_no
     user.save((err,data)=>{
          if(!err){
               console.log("Database Saved Succesfully")
               res.render('vendors/welcomev',{data:user})
          }
          else
               console.log(err)    
     })
})
router.post('/login',(req,res)=>{
     uname = req.body.uname
     pwd = req.body.pwd
     sess  = req.session
     sess.uid = uname
     req.session.save()
     query = { $and : [{mail_id : uname}, {pwd : pwd}]}
     newUser.find(query).then((result) =>{
          console.log(result)
          res.redirect("/user/it")
     }).catch((err)=>{
          console.log(err)
     })
})
router.post('/loginv',(req,res)=>{
     uname = req.body.uname
     pwd = req.body.pwd
     sessv  = req.session
     sessv.uid = uname
     
     req.session.save()
     query = { $and : [{venid : uname}, {pwd : pwd}]}
     newVendor.find(query).then((result) =>{
          console.log(result)
          console.log(req.session.uid)
          res.redirect('/item/itv')
     }).catch((err)=>{
          console.log(err)
     })
})
router.get("/it",(req,res)=>{
     newItem.find((err,data)=>{
                    if(!err){
                         res.render('users/dashboard',{data:data})
                    }
               })  
})
module.exports = router