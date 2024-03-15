// Importing required modules and models
const User = require('../models/user.model'); // Importing the User model
const jwt = require("jsonwebtoken"); // JSON Web Token library for authentication
const bcrypt = require("bcrypt"); // Library for hashing passwords
const secret = process.env.SECRET_KEY; // Secret key for JWT signing

// Exporting an object containing methods for user-related operations
module.exports = {
    // Method for handling user login
    login: async (req, res) => {
        try {
            // Find user by email
            const user = await User.findOne({ email: req.body.email });

            // If user doesn't exist
            if (user === null) {
                return res.status(400).send('Email not found');
            }

            // Compare passwords
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
            if (!correctPassword) {
                return res.status(400).send('Incorrect Password');
            }

            // Generate JWT token
            const userToken = jwt.sign({
                id: user._id
            }, secret);

            // Send token as a cookie and user information as JSON response
            res.status(200).cookie("token", userToken, {
                httpOnly: true,
                maxAge: 2 * 60 * 60 * 1000, // Expires in 2 hours
                secure: true,
                sameSite: 'Strict'
            }).json({ msg: "success!", user: user, token: userToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Method for user registration
    register: async (req, res) => {
        try {
            // Create a new user
            const user = await User.create(req.body);

            // Generate JWT token
            const userToken = jwt.sign({
                id: user._id
            }, secret);

            // Send token as a cookie and user information as JSON response
            res.cookie("token", userToken).json({ msg: "success!", user: user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Method for user logout
    logout: (req, res) => {
        // Clear the token cookie
        res.clearCookie('token');
        res.sendStatus(200);
    },

    // Method for getting information of the logged-in user
    getLoggedInUser: async (req, res) => {
        try {
            // Verify JWT token and find the logged-in user in the database
            const userId = jwt.verify(req.cookies.token, secret).id;
            const user = await User.findById(userId);

            // If user doesn't exist
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }

            // Send user information as JSON response
            res.json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    },

    // Method for getting user by ID
    getUserById: (req, res) => {
        // Find a user based on the ID passed in the parameters
        const userId = req.params.id;
        User.findById(userId)
            .then(user => {
                // If user doesn't exist
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // Send user information as JSON response
                res.status(200).json(user);
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({ message: 'Internal server error' });
            });
    }
}
