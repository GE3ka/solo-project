// Importing mongoose library
const mongoose = require("mongoose");

// Defining a schema for Job documents
const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "{PATH} is required"], // Title is required
        minLength: [3, "{PATH} must have at least 3 chars"] // Minimum length for title
    },
    description: {
        type: String,
        required: [true, "{PATH} is required"], // Description is required
        minLength: [10, "{PATH} must have at least 10 chars"] // Minimum length for description
    },
    location: {
        type: String,
        required: [true, "{PATH} is required"], // Location is required
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming the user ID is stored as an ObjectId
        ref: 'User' // Reference to the User model, to establish a relationship between job and user
    },
}, { timestamps: true }) // Timestamps for createdAt and updatedAt fields

// Creating a mongoose model for Job using the defined schema
const Job = mongoose.model("Job", JobSchema)

// Exporting the Job model
module.exports = Job
