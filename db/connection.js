//db/connection.js
require("dotenv").config() // load .env variables
const mongoose = require("mongoose") // Import the Mongoose library


//DESTRUCTURE ENV VARIABLES
const {DATABASE_URL} = process.env

// Connect to MongoDB using the URL specified in the environment variables
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,  // Use new URL parser
  useUnifiedTopology: true  // Use the new server discovery and monitoring engine
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// EXPORT CONNECTION
module.exports = mongoose