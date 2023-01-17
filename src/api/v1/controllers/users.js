const bcrypt = require("bcrypt");
const {User, findByEmail, findById2} = require("../models/user");
const { createToken } = require("../middleware/jwt");


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

        await user.insert();
        // Create cookie for user (log user in)
        const accessToken = createToken(user);
            res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 1 * 1000, // cookie lasts 24 hours
            });
        res.json({msg:"User created successfully", email: user.email, name: user.name});

        
        
    });
    }catch(e){
        // res.writeHead(200, {"Content-Type": "application/json"});
        console.log(`Error is: ${e}`);
        return res.json({error: "Unknown error occurred " +e});
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
    return res.json({msg: `User profile ${process.env.DB_PASS}`});
};

module.exports = {registerUser, loginUser, userProfile};
