const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    body: String,
    rating:{
        type : Number,
        min: 1,
        max : 5,
        require : true,
    },
    author:{
        type: Schema.Types.ObjectId,
        ref : 'userAuth'
    }
});

module.exports = mongoose.model("Review", reviewSchema)