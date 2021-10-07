const mongoose = require('mongoose')
const { string } = require('prop-types')

const newItemSchema = new mongoose.Schema({
     venid:String,
     icode:Number,
     iname:String,
     category:String,
     price:Number,
     image:String
})

module.exports = mongoose.model('Items',newItemSchema)