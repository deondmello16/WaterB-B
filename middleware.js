const {campgroundSchema,reviewSchema} = require('./schema')
const {expressError} = require('./utils/expressErrors')
const Campground = require('./models/campGround')
const Review = require('./models/review')

module.exports.isLoggedIn = (req,res,next)=>{
    req.session.returnTo = req.originalUrl
    console.log(req.originalUrl)
    if(!req.isAuthenticated()){
        
        req.flash('error',"You must be logged in !!")
        return res.redirect('/login')
    }
    next()
}

module.exports.validateCampground = (req,res,next)=>{
    const result = campgroundSchema.validate(req.body)
    console.log(result)
    if(result.error){
        const msg = result.error.details.map(el =>el.message).join(',')
        throw new expressError(msg,400)
    }else{next()}
}

module.exports.isAuth = async (req,res,next)=>{
    const {id} = req.params
    const campground = await Campground.findById(id)
    console.log(campground)
        if(!campground){
            req.flash('error',"Page is retired/doesn't exist")
            return res.redirect(`/campground`)
        }
    if(!campground.author.equals(req.user._id)){
        req.flash('error',"Permission Denied")
         return res.redirect(`/campground`)
    }next()
}

module.exports.isReviewAuth = async (req,res,next)=>{
    const {reviewId} = req.params
    const review = await Review.findById(reviewId)
    console.log(review)
        if(!review){
            req.flash('error',"Review deleted/doesn't exist")
            return res.redirect(`/campground`)
        }
    if(!review.author.equals(req.user._id)){
        req.flash('error',"Permission Denied")
         return res.redirect(`/campground`)
    }next()
}

module.exports.validateReview = (req,res,next)=>{
    console.log(req.body.review)
    const result = reviewSchema.validate(req.body)
    if (result.error){
        // console.log("here 2")
        const msg = result.error.details.map(el =>el.message).join(',')
        console.log(result.error.details)
        throw new expressError(msg,400)
    }else{next()}
    // console.log(msg)
}