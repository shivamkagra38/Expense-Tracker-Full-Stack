//Importing required modules
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotevn = require("dotenv");
const CORS = require("cors");
const connectDB = require("./MongoDB/db_connect.js");
const registerUser = require("./Controllers/registerUser.js");
const loginUser = require("./Controllers/loginUser.js");
const logoutUser = require("./Controllers/logoutUser.js");

//Injecting environment variables
dotevn.config({});

console.log(`\nBackend written in Node.js by ${process.env.DEVELOPER}\n`);

//Setting up listening port
var PORT = 8000;
app.listen(PORT, () => {

    connectDB();
    console.log(`Server is running on port ${PORT}.`);
    
});


app.use(express.json());//Middleware for json parsing
app.use(express.urlencoded({extended:true}));// Middleware for parsing form data
app.use(CORS());//Middleware for avoiding CORS policy error

app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/logout", logoutUser);