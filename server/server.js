// Importing necessary packages/modules
const express = require("express"); // Express web framework for Node.js
const cors = require("cors"); // Cross-Origin Resource Sharing middleware
const cookieParser = require('cookie-parser'); // Middleware to parse cookies
const app = express(); // Creating an instance of the Express application

// Load environment variables from .env file into process.env
require('dotenv').config();

// Set the port number from environment variable
const port = process.env.PORT;

// Middleware setup: cookie-parser for parsing cookies,
// express.json() for parsing incoming request bodies in JSON format,
// express.urlencoded() for parsing incoming request bodies in URL-encoded format
app.use(cookieParser(), express.json(), express.urlencoded({ extended: true }));

// CORS middleware setup: allowing cross-origin requests from a specific origin
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Connect to MongoDB using Mongoose
require('./config/mongoose.config');

// Routing: Mounting user routes on the Express app
require('./routes/user.route')(app);

// Start the Express server and listen on the specified port
app.listen(port, () => {
    console.log("Listening to port", port);
});
