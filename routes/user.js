const express = require('express')
const Router = express.Router()
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user')
const { expressError } = require('../utils/expressErrors')

const user = require('../controller/user')


Router.route('/register')
        .get(user.getRegister)
        .post(catchAsync(user.postRegister))

Router.route('/login')
        .get(user.getLogin)
        .post(passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),user.postLogin)

Router.route('/logout')
        .get(user.getLogout)

module.exports = Router;

