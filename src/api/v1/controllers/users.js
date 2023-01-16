const bcrypt = require("bcrypt");
const User= require("../models/user");
const { createToken } = require("../middleware/jwt");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const registerUser = (req, res) => {
    const {email, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        let user = new User(email, hash);
        res.json(`User ${user.email}, ${user.password}, ${password}`);
    });

    return res.json({error: "Unknown error occurred"});
};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const loginUser = (req, res) => {
    // TODO: remove hPassword with db implemented
    const {email, password, hPassword} = req.body;
    
    bcrypt.compare(password, hPassword).then((match) => {
        if(!match){
            res.status(500).json({error: "Wrong Username or Password"});
        }else{
            let user = new User(email, hPassword);
            // Create access token and store as cookie
            const accessToken = createToken(user);
            res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 1 * 1000, // cookie lasts 24 hours
            });
            return res.json({msg: "User logged in"});
        }
    })

    
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const userProfile = (req, res) => {
    return res.json({msg: "User profile"});
};

module.exports = {registerUser, loginUser, userProfile};
