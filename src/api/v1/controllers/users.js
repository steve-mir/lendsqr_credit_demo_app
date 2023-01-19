const bcrypt = require("bcrypt");
const {User, findByEmail, getUserById, updateUser, getUser} = require("../models/user");
const { createToken } = require("../middleware/jwt");
const { verify } = require("jsonwebtoken");


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const registerUser = async (req, res) => {
    const {email, password, name} = req.body;
    try{
        bcrypt.hash(password, 10).then(async (hash) => {
        let user = new User(name, email, hash);

        try{
            await user.insert();
        }catch(e){
            res.status(500).json({msg:e,});
        }
        // Create cookie for user (log user in)
        const accessToken = createToken(user);
            res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 1 * 1000, // cookie lasts 24 hours
            });
        res.status(200).json({msg:"User created successfully", email: user.email, name: user.name});

        
        
    });
    }catch(e){
        // res.writeHead(200, {"Content-Type": "application/json"});
        console.log(`Error is: ${e}`);
        return res.status(500).json({error: "Unknown error occurred " +e});
    }

};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await findByEmail(email);
    
    // Decrypt password and compared 
    bcrypt.compare(password, user.password).then((match) => {
        if(!match){
            res.status(500).json({error: "Wrong email or password"});
        }else{

            // Create access token and store as cookie
            const accessToken = createToken(user);
            res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 1 * 1000, // cookie lasts 24 hours
            });
            return res.status(200).json({msg: "User logged in"});
        }
    })

    
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getUsers = async (req, res) => {

    try{
        let users = await getUser();
        res.status(200).json({users});
    }catch(error){
        res.status(500).json({error: error.message});
    }

    
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getCurrentUser = async (req, res) => {

    // Get User credentials (uid)
    let cookie = req.cookies;
    var decodedClaims = verify(cookie['access-token'], 'jwtsecretplschange');
    let userId = decodedClaims['uid'];

    try{
        let user = await getUserById(userId);
        res.status(200).json({user});
    }catch(error){
        res.status(500).json({error: error.message});
    }

    
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const updateUserProfile = async (req, res) => {
    const {name, username, phone} = req.body;

    // Get User credentials (uid)
    let cookie = req.cookies;
    var decodedClaims = verify(cookie['access-token'], 'jwtsecretplschange');
    let userId = decodedClaims['uid'];

    try{
        let user = await getUserById(userId);
        // let user = new User();
        user.updated_at = new Date().toISOString();//updatedAt();
        user.name = name;
        user.username = username;
        user.phone = phone;
        await updateUser(user);
        res.status(200).json({user});
    }catch(error){
        res.status(500).json({error: error.message});
    }

    
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const userProfile = (req, res) => {
    return res.json({msg: `User profile ${process.env.DB_PASS}`});
};

module.exports = {registerUser, loginUser, userProfile, getUsers, getCurrentUser, updateUserProfile};
