const mongoose = require('mongoose')
const { string } = require('prop-types')

const newVendorSchema = new mongoose.Schema({
     venid:String,
     uname:String,
     pwd:String,
     mail_id:String,
     geneder:String,
     dob:Date,
     contact_no:Number
})

module.exports = mongoose.model('Vendors',newVendorSchema)