const Campground = require('../models/campGround')
const Review = require('../models/review');

module.exports.postReview = async (req,res)=>{
    console.log(req.body.review)

    const newReview = await  new Review(req.body.review)
    const campground = await Campground.findById(req.params.id)
    // console.log(campground)
    newReview.author = req.user._id 
    campground.review.push(newReview)
    await newReview.save()
    await campground.save()
    console.log("Here")
    res.redirect(`/campground/${campground.id}`)

}

module.exports.deleteReview = async(req,res)=>{
    const {id , reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, {$pull:{review:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/campground/${id}`)
}