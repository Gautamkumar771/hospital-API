// Import the Mongoose library
const mongoose =require('mongoose');

// Connect to a MongoDB database running locally on port 27017 with the 'hospital' database name
mongoose.connect('mongodb://127.0.0.1:27017/hospital');

const db = mongoose.connection;
// Handle any connection errors by logging them to the console
db.error(
"error",
console.error.bind(console, "error is connecting with mongoo db")
);

db.once('open',()=>{
    console.log('sucessfully connecting to db')
})

module.exports = db;