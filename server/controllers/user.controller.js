const User = require('../models/user.model')
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const secret = process.env.SECRET_KEY;

module.exports = {
    login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if(user === null) {
            // email not found in users collection
            
            return res.status(400).send('Email not found ');
        }
     
        // user found -- checking password
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
     
        if(!correctPassword) {
            // password wasn't a match!
            return res.status(400).send('Incorrect Password');
        }
     
        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id
        }, secret);
        
        
        res.status(200).cookie("token",userToken, {httpOnly: true, 
            maxAge: 2*60*60*1000,
            secure: true, 
            sameSite: 'Strict'
        }).json({ msg: "success!", user : user, token: userToken }); 
        
    },


    register: async (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, secret);       
                res
                    .cookie("token", userToken )
                    .json({ msg: "success!", user : user });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
            });
    },
    
        logout: (req, res) => {
            res.clearCookie('token'); 
            res.sendStatus(200);
        }, 


        getLoggedInUser: async(req,res)=>{
        try {
            // find the logged-in user in the database
            const userId = jwt.verify(req.cookies.token,secret).id
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    
    getUserById: (req, res) => {
        //find a user based on the id passed in the params
        const userId = req.params.id;
        User.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json(user);
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({ message: 'Internal server error' });
            });
    }        
}