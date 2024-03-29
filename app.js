const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
const cors = require('cors');

//config
dotenv.config({path:"config/config.env"});

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3000/', 'https://rrocks.netlify.app', 'https://master--rrocks.netlify.app']
  })); 
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//router import
const product = require('./routes/productRoute');
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order);
app.use('/api/v1',payment);
//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
