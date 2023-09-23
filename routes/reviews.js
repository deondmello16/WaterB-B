const express = require('express')
// use merge Params while using routes as it is false by default 
const router = express.Router({mergeParams:true})

const Campground = require('../models/campGround')
const ejsmate = require('ejs-mate')
const catchAsync = require('../utils/catchAsync')
const {expressError} = require('../utils/expressErrors')
const {campgroundSchema,reviewSchema} = require('../schema')
const Review = require('../models/review');
const {validateReview} = require('../middleware')
const {isLoggedIn,isReviewAuth,validateCampground} = require('../middleware')
const review = require('../models/review')
const reviewControl = require('../controller/reviews')


router.post('/',isLoggedIn, validateReview ,catchAsync(reviewControl.postReview))

router.delete('/:reviewId',isLoggedIn,isReviewAuth ,catchAsync(reviewControl.deleteReview))

module.exports = router