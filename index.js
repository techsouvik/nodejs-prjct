require('./models/db')
let cap
const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const session = require('express-session')
const userController = require('./controllers/userController')
const itemController = require('./controllers/itemController')
const cartController = require('./controllers/cartController')
app.use(session({
     secret:'souvik',
     saveUninitialized:true,
     resave: false
}))
const port = process.env.PORT || 3030
app.set('view engine','ejs')
app.use(bodyparser.urlencoded({
     extended:true
}))
app.use(express.static("public"))

app.get('/',(req,res)=>{
     res.render('index')
})
app.get('/login',(req,res)=>{
     res.render('users/login')
})
app.get('/loginv',(req,res)=>{
     res.render('vendors/loginv')
})
app.get('/register',(req,res)=>{
     cap = (Math.floor(1000 + Math.random() * 9000))
     res.render('users/register',{cap:cap})
})
app.get('/getCaptcha',(req,res)=>{
     cap = (Math.floor(1000 + Math.random() * 9000))
     res.send(JSON.stringify(cap))
})
app.get('/checkCaptcha',(req,res)=>{
     console.log("hello")
     right = '&#x2713';
     wrong = '&#x274C;';
    val = req.params.val
    if(cap == val){
         res.send(JSON.stringify(right))
    }
    else{
         res.send(JSON.stringify(wrong))
    }
})
app.get('/registerv',(req,res)=>{
     res.render('vendors/registerv')
})
app.get('/c',(req,res)=>{
     res.render('users/itemc')
})
app.get('/msg',(req,res)=>{
     res.render("index")
})
app.get('/logout',(req,res)=>{
     console.log(req.session.uid)
     res.render("users/logout",{uid:req.session.uid})
     req.session.destroy()
     console.log(req.session)
})
app.use('/user',userController)
app.use('/item',itemController)
app.use('/cart',cartController)
app.listen(port,()=>{
     console.log("Server is running at PORT 3000")
})