const { verify } = require("jsonwebtoken");
const { Wallet } = require("../models/wallet");


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const createNewWallet = async (req, res) => {
    const {type, currency} = req.body;
    let cookie = req.cookies;

    // Get User credentials (uid)
    var decodedClaims = verify(cookie['access-token'], 'jwtsecretplschange');
    let userId = decodedClaims['uid'];

    let wallet = new Wallet(type, currency, userId);
    console.log("Printing new wallet");
    console.log(userId);

    await wallet.createWallet();
        res.json({msg:"Wallet created successfully", type: wallet.type, currency: wallet.currency, balance: wallet.balance, uid: wallet.owner});

};


module.exports = {createNewWallet};
