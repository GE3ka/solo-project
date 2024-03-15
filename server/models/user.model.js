// Importing necessary modules
const bcrypt = require('bcrypt'); // Library for hashing passwords
const mongoose = require('mongoose'); // MongoDB object modeling tool
const { Schema } = mongoose;

// Define a schema for the User model
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"], // Validation: First name is required
        minlength: [3, "First name must contain at least 3 characters"] // Validation: Minimum length of first name
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"], // Validation: Last name is required
        minlength: [3, "Last name must contain at least 3 characters"] // Validation: Minimum length of last name
    },
    email: {
        type: String,
        required: [true, "Email is required"], // Validation: Email is required
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val), // Validation: Email format validation
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"], // Validation: Password is required
        minlength: [8, "Password must be 8 characters or longer"] // Validation: Minimum length of password
    }
}, { timestamps: true }); // Adding timestamps for createdAt and updatedAt fields

// Virtual field for confirming password
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword) // Getter for confirmPassword
    .set(value => this._confirmPassword = value); // Setter for confirmPassword

// Pre-validate hook to check if password matches confirm password
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

// Pre-save hook to hash the password before saving
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10) // Hash the password with a salt factor of 10
        .then(hash => {
            this.password = hash; // Assign the hashed password to the password field
            next(); // Proceed to save
        })
        .catch(err => next(err)); // Handle any errors
});

// Create the User model using the schema
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;
