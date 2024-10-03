const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
     firstName : {
        type: String,
        required: true,
        minLength:4,
        maxLength:50,
     },
     lastName :{
        type: String,
     },
     emailId : {
        type: String,
        lowercase:true,
        unique:true,
        required:true,
        trim:true,
        validate(value){
          if(!validator.isEmail(value)){
             throw new Error("Invalid email Address: "+ value);
          }
        }
     },
     password:{
        type: String,
        required:true,
     },
     age : {
        type: Number,
        min:18,
     },
     gender:{
        type: String,
        validate(value){
         if(!["male","female","other"].includes(value)){
            throw new Error("Gender data is not valid");
         }
        },
     },
     photoUrl:{
         type : String,
         default: "http://geographyandyou.com/images/user-profile.png",
         validate(value){
            if(!validator.isURL(value)){
               throw new Error("Invalid photo Url: "+ value);
            }
          }
     },
     about:{
      type : String,
      default: "This is a about of the user!",
     }
},{
   timestamps:true
});

userSchema.methods.getJWT = async function(){
   const user = this;
   const token = await jwt.sign({ _id: user._id }, "DEVSagar263",{expiresIn:'1d'});
   return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash)
    return isPasswordValid;
}

const userModel = mongoose.model("User",userSchema);

module.exports = userModel 