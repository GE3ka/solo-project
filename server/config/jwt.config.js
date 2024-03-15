// Importing the jsonwebtoken library
const jwt = require("jsonwebtoken");

// Retrieving the secret key from environment variables
const secret = process.env.SECRET_KEY;

// Defining the middleware function to authenticate JWT tokens
module.exports.authenticate = (req, res, next) => {
    // Extracting the token from the Authorization header
    const token = req.header('Authorization');

    // Verifying the token with the secret key
    jwt.verify(token, secret, (err, payload) => {
        if (err) {
            // If verification fails, return a 401 Unauthorized response
            res.status(401).json({ verified: false });
        } else {
            // If verification succeeds, call the next middleware function
            next();
        }
    });
}
