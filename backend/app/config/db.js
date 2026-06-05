const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL

const connectDB= async() =>{
try{
    const conn = await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected");
}catch(error){
    console.log("Database Connection Failed:", error);
}
}
module.exports = connectDB;