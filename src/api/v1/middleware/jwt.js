const {sign, verify} = require("jsonwebtoken");

const createToken = (user) => {
    const accessToken = sign(
        {email: user.email, id: user.password},
        "jwtsecretplschange"
    );
    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if(!accessToken) {
        return res.status(500).json({error: "User not authenticated"});
    }

    try{
        const validToken = verify(accessToken, "jwtsecretplschange")
        if(validToken) {
            req.authenticated = true;
            return next();
        }
    }catch(e){
        return res.status(501).json({error: e});
    }
};

module.exports = {createToken, validateToken};