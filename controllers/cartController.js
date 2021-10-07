const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const {v4:uuidv4} = require('uuid') 
const session = require('express-session')
const router = express.Router()
router.use(express.static("public"))
router.use(bodyParser.urlencoded({
     extended:true
}))
router.use(session({
     secret:'souvik',
     saveUninitialized:true,
     resave: false
}))
router.use(bodyParser.json())
const newCart = mongoose.model('Cart')
const newItem = mongoose.model('Items')

router.use(express.static("public"))
router.post('/',(req,res)=>{
    const cart =new newCart();
    var ic=req.body.icode;
    // console.log(req.body.count);
    newItem.findOne({icode:ic},(err,data)=>
    {
        if(!err){
            // console.log(data.iname);
            newCart.findOne({icode:ic},(err1,data1)=>{
                if(err1){
                    // console.log(err);
                    throw err1;     
                }
                // if the item is not present in the cart;
                else if(!data1)
                {
                    console.log("DataPresent");
                    console.log(data1);  
                    sess = req.session  
                    cart.icode=ic,
                    cart.iname=data.iname,
                    cart.category=data.category,
                    cart.price=data.price,
                    cart.image=data.image,
                    cart.qty=req.body.id
                    cart.uid = sess.uid
                    cart.save((err2,data2)=>{
                        if(err2) throw err2;

                        })
                }
                // if the item is present just update the quantity;
                else{
                    // console.log("Data Present ");
                    qt=parseInt(data1.quantity)+parseInt(req.body.count);
                    // console.log(qt);
                    newCart.updateOne({icode:ic},{$set:{quantity:qt}},(err3,res3)=>{
                        if(err3)
                            throw err3;
                        // console.log("Updated");

                    })
                
                
                }
            
            })
        }
        else throw err;
    });

});
router.get('/cart',(req,res)=>{
     newCart.find((err,results)=>{
          let icode =[]
          let arr=[]
          sess = req.session
        //   console.log(results)
          results.map((item)=>{
               icode.push(item.icode)
               arr.push({'icode':item.icode,'qnty':item.qty})
          })
        //   console.log(icode)
        //   console.log(arr)
        console.log(req.session.uid)
          query = {$and : [{icode:icode}, {uid:sess.uid}]}
          console.log(query)
          newCart.find(query).then((result) =>{
            //    console.log(result)
               res.render("users/addcart",{data:result})
          })
     })
})
router.get('/cartpage',(req,res)=>{
    newCart.find((err,data)=>{
        res.render("users/addCart.ejs",{data:data})
    })
})
router.get('/delete/:id',(req,res)=>{
    // console.log(req.params.id);
    // console.log("k");
    newCart.deleteOne({icode:req.params.id},(err,data)=>{
        // console.log(data);
        res.redirect('/cart/cart')
    })
})
router.get('/checkout',(req,res)=>{
     price  = req.query.price
     orderid = uuidv4();
     console.log(parseInt(orderid))
     res.render("users/checkout",{p:price,oid:orderid})
})
module.exports = router