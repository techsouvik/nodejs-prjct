const mongoose = require('mongoose')
const { string } = require('prop-types')

const newUserSchema = new mongoose.Schema({
     uname:String,
     pwd:String,
     mail_id:String,
     geneder:String,
     dob:Date,
     contact_no:Number
})

module.exports = mongoose.model('Users',newUserSchema)