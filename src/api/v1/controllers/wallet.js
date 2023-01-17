const { verify } = require("jsonwebtoken");
const { Wallet, getAllWallets } = require("../models/wallet");


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

    await wallet.createWallet();
        res.json({msg:"Wallet created successfully", type: wallet.type, currency: wallet.currency, balance: wallet.balance, uid: wallet.owner});

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getUserWallets = async (req, res) => {
    let cookie = req.cookies;

    // Get User credentials (uid)
    var decodedClaims = verify(cookie['access-token'], 'jwtsecretplschange');
    let userId = decodedClaims['uid'];

    let wallets = await getAllWallets(userId);
    res.json({wallets});

};

// Fund wallet


module.exports = {createNewWallet, getUserWallets};
