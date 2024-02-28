const app = require('./app');
const cloudinary = require("cloudinary");
const dotenv = require('dotenv');
const connectDatabase  = require('./config/database');

//Handling Uncaught Exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Uncaught Exceptions`);
    process.exit(1);
})

//config
dotenv.config({path:"config/config.env"});

//connecting database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})


//unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled Promise Rejections`);

    server.close(()=>{
        process.exit(1);
    })
})