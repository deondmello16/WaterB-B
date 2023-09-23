const Campground = require('../models/campGround')
const catchAsync = require('../utils/catchAsync')
const Review = require('../models/review');

module.exports.index = async(req,res)=>{
    const camps = await Campground.find({}).populate('author')
    res.render('waterb&b/index',{camps})
}

module.exports.getNew = async(req,res)=>{
    res.render('waterb&b/addcamp')
}

module.exports.postNew = async (req,res)=>{
    const {campground} = req.body;
    const camp = new Campground(campground)
    camp.images = req.files.map(f =>{url : f.path,filename: f.filename})
    camp.author = req.user._id;
    camp.save()
    req.flash('success',"Successfully made new campground")
    res.redirect(`/campground/${camp._id}`)

}

module.exports.getId = async(req,res)=>{
    const {id} = req.params;
    const camp = await Campground.findById(id).populate({
        path:'review',
        populate:{
            path:'author',

        }
    }).populate('author')
    // const review = await Review.findById(camp.)
    if(!camp){
        req.flash('error', 'Camp Ground not found')
        res.redirect('/campground')
    }
    res.render('waterb&b/showcamps',{camp})
}

module.exports.getIdEdit = async(req,res)=>{
    const {id} = req.params;
    const camp = await Campground.findById(id)
    res.render('waterb&b/editform',{camp})
}

module.exports.patchId = async(req,res)=>{
    const {id} = req.params;
    // console.log(req.body)
    const camp = await Campground.findByIdAndUpdate(id,req.body.campground)
    // console.log(camp)
    req.flash('success',"Successfully Updated campground")
    res.redirect(`/campground/${id}`)
}

module.exports.deleteId = async (req,res)=>{
    const {id} = req.params;
    const camp = await Campground.findByIdAndDelete(id)
    res.redirect('/campground')
}