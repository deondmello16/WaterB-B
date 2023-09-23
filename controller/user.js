const User = require('../models/user')
const passport = require('passport')

module.exports.getRegister = (req,res)=>{
    res.render('user/register')
}

module.exports.postRegister = async (req,res)=>{
    try{
        const {username,email,password} = req.body;
        // console.log(req.body)
        const user = User({email,username})
        // console.log(user)
        const registeredUser = await User.register(user,password)
        // console.log("done:",registeredUser)
        // console.log(registeredUser)
        req.login(registeredUser,(e)=>{
            console.log('logged in')
            if(e){
                return next(e)
            }
            req.flash('success', "Welcome to WaterB&B")
            res.redirect('/campground')
        })
    }catch(e){
        req.flash("error",e.message)
        res.redirect('/register')
    }
    
}

module.exports.getLogin = (req,res)=>{
    res.render('user/login')
}

module.exports.postLogin = (req,res)=>{
    // console.log('atauth',req.session)
    const redirectURL = req.session.returnTo || '/campground'
    req.flash('success',"Welcome Back ")
    delete req.session.returnTo
    res.redirect(redirectURL)
}


module.exports.getLogout = (req,res)=>{
    req.logout((err) => {
        if (err) {
          throw new expressError('Error during logout:', err);
        } else {
            // console.log('Logout successful');
          // Additional actions after successful logout
            req.flash('success','Goodbye !!')
            res.redirect('/campground')
        }
      });
    
}