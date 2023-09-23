if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

// console.log(process.env)

// const cloudinary = require('cloudinary');

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_SECRET,
//   api_secret: process.env.API_SECRET,
//   secure: true,
// });

const express = require('express')
const path = require('path')
const app = express()
var methodOverride = require('method-override')
const { default: mongoose } = require('mongoose')
// const Campground = require('./models/campGround')
const ejsmate = require('ejs-mate')
// const catchAsync = require('./utils/catchAsync')
const {expressError} = require('./utils/expressErrors')
// const {campgroundSchema,reviewSchema} = require('./schema')
// const Review = require('./models/review');
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const localStratgy = require('passport-local')
const userAuth = require('./models/user')


app.use(flash())
// session
const sessionConfig = {
    secret: "thisisasecret",
    resave:true,
    saveUninitialized :true,
    cookies:{
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge : 1000*60*60*24*7,
    }
}

app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStratgy(userAuth.authenticate()))

passport.serializeUser(userAuth.serializeUser())
passport.deserializeUser(userAuth.deserializeUser())

// ROutes require
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')
const registerationRoutes = require('./routes/user')



// ejs 
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

// Statics 
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'/public')))
app.use(express.urlencoded({extended:true}))
app.engine('ejs',ejsmate)

// FLASH 
app.use((req,res,next)=>{
    if(!['/login','/'].includes(req.originalUrl)){
        req.session.returnTo = req.originalUrl
        // console.log('main: ',req.session)
    }
    res.locals.isLoggedIn = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

// Routes 
app.use('/campground',campgroundRoutes)
app.use('/campground/:id/review',reviewRoutes)
app.use("/",registerationRoutes)

// momgo connect
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WaterB&B');
    console.log("Done")
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }
  main().catch(err => console.log(err));

// error handling start //
app.all('*', (req,res,next)=>{
    next(new expressError('Page Not Found ',404))
})

app.use((err, req,res,next)=>{
    const {statusCode =500 , message = 'something went wrong'}=err;
    res.status(statusCode).render('pages/error',{err})
})
// error handling end //
 

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})