const jwt = require('jsonwebtoken');
const User = require("../models/user");
const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token){
            throw new Error("Token is not valid");
        }

        const decodeData = await jwt.verify(token, "DEVSagar263");

        const { _id } = decodeData;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user
        next();
    } catch (error) {
        throw new Error("ERROR: " + error);
    }
}

module.exports = {
    userAuth,
}