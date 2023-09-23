const { string } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const passpostLocalMongoose = require('passport-local-mongoose')

const userAuthSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    }
})

userAuthSchema.plugin(passpostLocalMongoose)

module.exports = mongoose.model('userAuth',userAuthSchema)
