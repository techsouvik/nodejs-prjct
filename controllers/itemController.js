const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const multer = require('multer')
const session = require('express-session')
const path = require('path')
const { query } = require('express')

router.use(session({
     secret:'souvik',
     saveUninitialized:true,
     resave: false
}))
router.use(express.static("public"))
const newItem = mongoose.model('Items')
router.use(bodyParser.json())
router.get('/',(req,res)=>{
     res.render('vendors/item')
})
let slno
const storage = multer.diskStorage({
     destination : (req,file,cb)=>{
          cb(null,'public/uploadimg')
     },
     filename : (req,file,cb)=>{
          slno = Date.now()+path.extname(file.originalname)
          cb(null,slno)
     }
})
const upload = multer({
     storage : storage
})

router.post('/save',upload.single('image'),(req,res)=>{
     const items = new newItem()
     // console.log(req.body)
     sessv = req.session
     items.venid = sessv.uid
     items.icode = req.body.icode
     items.iname = req.body.iname
     items.category = req.body.category
     items.price = req.body.price
     items.image = slno
     items.save((err,data)=>{
          if(!err){
               res.redirect("/item/itv")
          }
          else
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

router.get("/itv",(req,res)=>{

     qr = ({ venid : req.session.uid})
     newItem.find(qr).then((result)=>{
                         res.render('vendors/dashboard',{data:result})
               })  
})

router.post('/srchv',(req,res)=>{
    let q=req.body.key
    data=""
    s="<div class='food mt-0'>"
    s+="<div class='container'>"
    s+="<div class='row align-items-center'>"
    if(q.length>0){
         qr2 = ({ venid:req.session.uid})
         newItem.find(qr2).then((results)=>{
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
                         s+=""
                         s+="</div></div>"
                    }
                })
                s+="</div></div></div>"
                res.send(s);
          })
    }
})


router.post('/srch',(req,res)=>{
    let q=req.body.key
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
                         s+=`<div class="qty mt-5">
                                    Quantity
                                    <br>
                                    <span class="minus bg-dark " id="M-<%=dt.icode%>">-</span>
                                    <input type="number" class="count" id="<%=dt.icode%>" name="qty" value="1">
                                    <span class="plus bg-dark" id="I-<%=dt.icode%>">+</span>
                                </div>
                            <a href="" class="c2" id="S-<%=dt.icode%>">Add to cart</a>`
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
router.get("/itemDetails",(req,res)=>{
     icode = req.query.id
     qr3 = { $and : [{venid : req.session.uid}, {icode : icode}]}
     console.log(qr3)
     newItem.find(qr3).then((results)=>{
          console.log(results)
          res.render("vendors/itemDetails",{data:results})
     })
})
router.post("/updateDetails",upload.single('image'),(req,res)=>{
     
     //delete the exisiting cell
     sessv = req.session
     qr4 = { $and : [{venid : sessv.uid}, {icode : req.body.icode}]}
     
     
     const items = new newItem()
     // console.log(req.body)
     items.venid = sessv.uid
     items.icode = req.body.icode
     items.iname = req.body.iname
     items.category = req.body.category
     items.price = req.body.price
     items.image = slno
     items.updateMany((err,data)=>{
          if(!err){
               res.redirect("/item/itv")
          }
          else
               console.log(err)   
     })
})
router.get("/cart1",(req,res)=>{
     res.render("users/addcart")

})
module.exports = router