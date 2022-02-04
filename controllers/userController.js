const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');


// Register a User

exports.registerUser = catchAsyncErrors( async (req,res)=>{

    const {name , email , password}  = req.body;
    const user = await User.create({
        name, email , password
    });
    sendToken(user,201,res);

});


exports.loginUser = catchAsyncErrors( async (req,res,next)=>{
    const {email,password} = req.body;

    // check if user has given email or password

    if(!email){
        return next(new ErrorHandler("Please enter email",400));
    }

    if(!password){
        return next(new ErrorHandler("Please Enter password",400));
    }

    // here we have to use select("+password") because we have not selected password in our Schema;

    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    
    const isPasswordMatched = await user.comparePassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    sendToken(user,200,res);

});


// Logout

exports.logoutUser = catchAsyncErrors( async (req,res)=>{
    
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
});


