const mongoose = require('mongoose');

const connectDB = async () => {
   await mongoose.connect(
        "mongodb+srv://sk-nodejs:sk-nodejs@cluster0.uq6lmlt.mongodb.net/sk-nodejs"
    )
}
module.exports = connectDB;


