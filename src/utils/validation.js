const validator = require("validator");

const validateSignUpData = (req)=>{
   const {firstName,lastName,emailId,password} = req.body;

   if(!firstName || !lastName){
    throw new Error("Name is not  valid");
   } else if (!validator.isEmail(emailId)){
     throw new Error("Email is not valid");
   } else if (!validator.isStrongPassword(password)){
    throw new Error("Please Enter Strong Password");
   }
};
const validateEditProfile = (req) => {
  allowedEditFields = ["firstName","lastName","photoUrl","about","skills"];
  const isEditAllowed = Object.keys(req.body).every((field)=>allowedEditFields.includes(field));

  return isEditAllowed;
}
module.exports = {
    validateSignUpData,
    validateEditProfile
};