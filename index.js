// Import necessary libraries and modules
const express = require('express');
// Middleware to parse request bodies
const bodyParser = require('body-parser');
const   db = require("./config/database");
// Passport.js for authentication
const passport = require('passport') 
const passportStratergy = require('./config/passport');
 // Import your application's routes
const router = require('./routes/router');
// Create an instance of the Express application
const app = express();
const port = 8000;

app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(router);

// Start the server and listen on the specified port
app.listen(port,(err) =>{
    if(err) {
        console.log(`server is giving an error: ${err}`);
    }else{
        console.log("server is succesfully up and running")
    }
});