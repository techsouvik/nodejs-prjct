const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/FoodArt',{
     useNewUrlParser:true,
     useUnifiedTopology:true
}).then(()=>{
     console.log("Connected")
}).catch((err)=>{
     console.log(err)
})
require('./NewUser.model')
require('./item.model')