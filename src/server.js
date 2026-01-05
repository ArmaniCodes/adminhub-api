require("dotenv").config();
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB and start the server only if the connection succeeds
async function connectDB(){
    try{
        await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
        console.log("Connected to MongoDB successfully");
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`)
        
        });
    }
    catch(err){
        console.error("MongoDB Connection Error: ", err);
        process.exit(1);
    }
}



connectDB();