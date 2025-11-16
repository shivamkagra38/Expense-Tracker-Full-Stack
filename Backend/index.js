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
const isAuth = require("./CustomMiddlewares/isAuth.js");
const expenseControllers = require("./Controllers/expenseControllers.js");

//Injecting environment variables
dotevn.config({});

console.log(`\nBackend written in Node.js by ${process.env.DEVELOPER}\n`);

//Setting up listening port
var PORT = process.env.PORT || 8000;

app.listen(PORT, () => {

    connectDB();
    console.log(`Server is running on port ${PORT}.`);
    
});

app.use(express.json());//Middleware for json parsing
app.use(express.urlencoded({extended:true}));// Middleware for parsing form data
app.use(CORS({origin:"https://expense-tracker-full-stack-by-shivam.netlify.app/",credentials: true}));//Middleware for avoiding CORS policy error
app.use(cookieParser());

app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/logout", logoutUser);

app.post("/add-expense", isAuth);
app.post("/add-expense", expenseControllers.addExpense);

app.post("/get-all-expenses", isAuth);
app.post("/get-all-expenses", expenseControllers.getAllExpenses);

app.put("/mark-as-done/:id", isAuth);
app.put("/mark-as-done/:id", expenseControllers.markAsDone);

app.delete("/remove-expense/:id", isAuth);
app.delete("/remove-expense/:id", expenseControllers.removeExpense);

app.put("/update-expense/:id", isAuth);
app.put("/update-expense/:id", expenseControllers.updateExpense);
