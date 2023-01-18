const { verify } = require("jsonwebtoken");
const { Deposit, getDepositHistory } = require("../models/deposit");
const { Transaction } = require("../models/transaction");
const { Wallet, getAllWallets, walletDeposit, getWalletById, walletWithdrawal } = require("../models/wallet");
const { getWithdrawalHistory, Withdrawal } = require("../models/withdrawals");


/**
 * This funds the users wallet.
 * no payment gateway was implemented
 * @param {*} req 
 * @param {*} res 
 */
const externalWithdrawal = async (req, res) => {
    const {amount, currency, desc, bankNo, bankName} = req.body;
    const walletId = req.query.walletId;
    let cookie = req.cookies;

    // get wallet balance
    let wallet = await getWalletById(walletId);
    
    // TODO: set minimum withdrawal amount
    if(wallet.balance < amount){
        console.log("Insufficient wallet balance");
        res.status(500).json({error:"Insufficient wallet balance"});
    }else{

        // Get User credentials (uid)
        var decodedClaims = verify(cookie['access-token'], 'jwtsecretplschange');
        let userId = decodedClaims['uid'];

        // STEP 1: subtract/decrement wallet balance
        await walletWithdrawal(walletId, amount);

        // STEP 2: Create Withdrawal data
        let withdraw = new Withdrawal(currency, walletId, bankNo, amount, desc, userId, bankName);
        withdraw.received = false; // this is set to true if the receiver has gotten their funds
        await withdraw.createWithdrawal(withdraw);

        // STEP 3: Create Transaction data
        let transaction = new Transaction("external-withdrawal", wallet.id, currency, desc, amount, bankName, userId, bankNo, walletId);
        await transaction.createTransaction();

        // await wallet.createWallet();
        res.json({msg:"Withdrawal successfully, funds will soon arrive at destination wallet"});
    
    }


    

};

const internalWithdrawal = async (req, res) => {
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
        res.json({msg:"Wallet created successfully"});
    }

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getUserWithdrawals = async (req, res) => {
    let cookie = req.cookies;

    // Get User credentials (uid)
    var decodedClaims = verify(cookie['access-token'], 'jwtsecretplschange');
    let userId = decodedClaims['uid'];

    let withdraws = await getWithdrawalHistory(userId);
    res.json({withdraws});

};

// Fund wallet


module.exports = {internalWithdrawal, externalWithdrawal, getUserWithdrawals};
