const { verify } = require("jsonwebtoken");
const { Deposit, getDepositHistory } = require("../models/deposit");
const { Transaction } = require("../models/transaction");
const { Wallet, getAllWallets, walletDeposit } = require("../models/wallet");


/**
 * This funds the users wallet.
 * no payment gateway was implemented
 * @param {*} req 
 * @param {*} res 
 */
const fundWallet = async (req, res) => {
    const {amount, currency, desc} = req.body;
    const walletId = req.query.walletId;
    let cookie = req.cookies;

    if(amount < 1000){
        res.json({msg:"Minimum amount is NGN 1000"});
    }else{
        // Get User credentials (uid)
        var decodedClaims = verify(cookie['access-token'], 'jwtsecretplschange');
        let userId = decodedClaims['uid'];

        // STEP 1: Fund/increment wallet balance
        // Note from this line below would be run if there was a payment gateway
        // it would then be executed if the gateway is successful.
        await walletDeposit(walletId, amount);

        // STEP 2: Create Deposit data
        let deposit = new Deposit(currency, userId, amount, walletId);
        await deposit.createDeposit();

        // STEP 3: Create Transaction data
        let transaction = new Transaction("deposit", deposit.id, currency, desc, amount, userId, "Self", walletId, "Self");
        await transaction.createTransaction();

        // await wallet.createWallet();
        res.json({msg:"Deposit successfully"});
    }

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getUserDeposits = async (req, res) => {
    let cookie = req.cookies;

    // Get User credentials (uid)
    var decodedClaims = verify(cookie['access-token'], 'jwtsecretplschange');
    let userId = decodedClaims['uid'];

    let deposits = await getDepositHistory(userId);
    res.json({deposits});

};

// Fund wallet


module.exports = {fundWallet, getUserDeposits};
