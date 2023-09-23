const express = require('express')
const router = express.Router()
const multer  = require('multer')
const {storage} = require('../cloudinary/index')
const upload = multer({ storage : storage })

// const { default: mongoose } = require('mongoose')
const Campground = require('../models/campGround')
const ejsmate = require('ejs-mate')
const catchAsync = require('../utils/catchAsync')
const {expressError} = require('../utils/expressErrors')
const {campgroundSchema,reviewSchema} = require('../schema')
const Review = require('../models/review');
const {isLoggedIn,isAuth,validateCampground} = require('../middleware')
const campgrounds = require('../controller/campground')



router.route('/')
        .get(catchAsync(campgrounds.index))

router.route('/new')
        .get(isLoggedIn,campgrounds.getNew)
        .post(isLoggedIn,validateCampground,upload.array('image'),catchAsync(campgrounds.postNew))
        // .post(,async (req,res)=>{
        //     console.log("in post");
        //     console.log("inside post", req.body ,req.files);
        //     res.send(req.files[0].path)
        // })

router.route('/:id')
        .get(catchAsync(campgrounds.getId))
        .patch(isLoggedIn,isAuth, validateCampground,catchAsync(campgrounds.patchId))
        .delete(isLoggedIn ,isAuth  ,catchAsync (campgrounds.deleteId ))

router.route('/:id/edit')
        .get(isLoggedIn,isAuth,catchAsync(campgrounds.getIdEdit))

module.exports = router ;