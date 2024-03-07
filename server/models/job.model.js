const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "{PATH} is required"],
        minLength: [3, "{PATH} must have at least 3 chars"]
    },
    description: {
        type: String,
        required: [true, "{PATH} is required"],
        minLength: [10, "{PATH} must have at least 10 chars"]
    },
    location: {
        type: String,
        required: [true, "{PATH} is required"],
        
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming the user ID is stored as an ObjectId
        ref: 'User' // Reference to the User model
    },
    
}, { timestamps: true })

const Job = mongoose.model("Job", JobSchema)
module.exports = Job