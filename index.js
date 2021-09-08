require('./models/db')
const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const userController = require('./controllers/userController')
const itemController = require('./controllers/itemController')
const port = process.env.PORT || 3000
app.set('view engine','ejs')
app.use(bodyparser.urlencoded({
     extended:true
}))
app.use(express.static("public"))

app.get('/',(req,res)=>{
     res.render('index')
})
app.get('/login',(req,res)=>{
     res.render('login')
})
app.get('/register',(req,res)=>{
     res.render('register')
})
app.get('/c',(req,res)=>{
     res.render('itemc')
})
app.get('/msg',(req,res)=>{
     res.render("index")
})
app.use('/user',userController)
app.use('/item',itemController)
app.listen(PORT,()=>{
     console.log("Server is running at PORT 3000")
})