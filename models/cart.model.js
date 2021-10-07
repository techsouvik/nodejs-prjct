const mongoose = require('mongoose')
const { string } = require('prop-types')

const newCartSchema = new mongoose.Schema({
     qty:Number,
     icode:Number,
     iname:String,
     category:String,
     price:Number,
     image:String,
     uid:String
})

module.exports = mongoose.model('Cart',newCartSchema)