// Importing mongoose library
const mongoose = require("mongoose");

// Retrieving the database name from environment variables
const dbName = process.env.DB;

// Connecting to the MongoDB database
mongoose.connect(`mongodb://127.0.0.1/${dbName}`)
    .then(() => console.log(`📡📡📡 Established a connection to the ${dbName} database`)) // Log success message if connection is successful
    .catch(err => console.log("❌❌❌❌ Something went wrong when connecting to the database", err)); // Log error message if connection fails
