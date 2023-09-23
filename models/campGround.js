const mongoose = require('mongoose')
const Review = require('./review')
const Schema = mongoose.Schema;

const CampGround = new Schema({
    title:String,
    image:String,
    price:Number,
    description:[
        {
            url : String ,
            filename : String,
        }
    ],
    location:String,
    author:{
        type: Schema.Types.ObjectId,
        ref: "userAuth"
    },
    review : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ]
})

CampGround.post('findOneAndDelete',async (doc)=>{
    // console.log(doc)
    if(doc){
        for(let i of doc.review){
            await Review.findByIdAndRemove(i)
            // console.log(i._id)
        }
    }
})


module.exports = mongoose.model("Campground",CampGround)