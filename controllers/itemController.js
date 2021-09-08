const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const multer = require('multer')
const path = require('path')

router.use(express.static("public"))
const newItem = mongoose.model('Items')
router.use(bodyParser.json())
router.get('/',(req,res)=>{
     res.render('item')
})

const storage = multer.diskStorage({
     destination : (req,file,cb)=>{
          cb(null,'public/uploadimg')
     },
     filename : (req,file,cb)=>{
          cb(null,Date.now()+path.extname(file.originalname))
          slno = Date.now()+path.extname(file.originalname)
     }
})
const upload = multer({
     storage : storage
})

router.post('/save',upload.single('image'),(req,res)=>{
     const items = new newItem()
     // console.log(req.body)
     items.icode = req.body.icode
     items.iname = req.body.iname
     items.category = req.body.category
     items.price = req.body.price
     items.image = slno
     items.save((err,data)=>{
          if(!err){
               res.redirect("/item/it")
          }
          else
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

router.post('/srch',(req,res)=>{
    let q=req.body.key
    let length = req.body.length
    data=""
    s="<div class='food mt-0'>"
    s+="<div class='container'>"
    s+="<div class='row align-items-center'>"
    if(q.length>0){
        newItem.find((err,results)=>{
            if(err)
            console.log(err);
            else{
                results.forEach((result)=>{
                    
                    m = result.iname.toLowerCase()
                    if(m.search(q,"g")!=-1){
                         s+="<div class='col-md-4'>"
                         s+="<div class='food-item'>"
                         s+="<img src='/uploadimg/"+result.image+"' height='150' width='150'><br><br></br>"
                         s+="<h2>"+result.iname+"</h2>"
                         s+="<p>"
                         s+="Type : "+result.category+"<br>"
                         s+="Price : Rs."+result.price+""
                         s+="</p>"
                         s+="<a href=''>View Menu</a>"
                         s+="</div></div>"
                    }
                })
                s+="</div></div></div>"
                res.send(s);
               }
        })
    }
})
router.get("/cart",(req,res)=>{
     let l = req.url.icd
     

})
router.get("/cart1",(req,res)=>{
     res.render("addcart")

})
module.exports = router