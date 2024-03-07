const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

module.exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    jwt.verify(token,secret, (err, payload) => {
        if (err) { 
            
            res.status(401).json({verified: false});
        } else {
            next();
        }
    });
}