const mongoose = require('mongoose');

const connectDB = async () => {
   await mongoose.connect(
        "mongodb+srv://sk-nodejs:sk-nodejs@cluster0.uq6lmlt.mongodb.net/sk-nodejs"
    )
}

connectDB().then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log(err.message)
})
