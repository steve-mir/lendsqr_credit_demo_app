const { verify } = require("jsonwebtoken");
const { Deposit, getDepositHistory } = require("../models/deposit");
const { Transaction } = require("../models/transaction");
const { getUser } = require("../models/user");
const { Wallet, getAllWallets, walletDeposit, getWalletById, walletWithdrawal, getUserWalletForCurrency } = require("../models/wallet");
const { getWithdrawalHistory, Withdrawal } = require("../models/withdrawals");

const MINIMUM_WITHDRAWAL_AMOUNT = 1000

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
    
    if(wallet.balance < amount){
        console.log("Insufficient wallet balance");
        res.status(500).json({error:"Insufficient wallet balance"});
    }else if(amount < MINIMUM_WITHDRAWAL_AMOUNT){
        console.log(`Sorry the minimum withdrawal is ${MINIMUM_WITHDRAWAL_AMOUNT}`);
        res.status(500).json({error:`Sorry the minimum withdrawal is ${MINIMUM_WITHDRAWAL_AMOUNT}`});
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
    const {amount, currency, desc, identifier} = req.body;
    const walletId = req.query.walletId;
    let cookie = req.cookies;

    // Get the user uid
    let user = await getUser(identifier);
    
    // Get the user wallet that matches the currency
    let receiverWallet = await getUserWalletForCurrency(user[0].uid, currency);

    // Get the first wallet
    receiverWallet = receiverWallet[0];
    user = user[0];
        
    // res.json({wallet});
    // get wallet balance
    let senderWallet = await getWalletById(walletId);
    

    if(senderWallet.balance < amount){
        console.log("Insufficient wallet balance");
        res.status(500).json({error:"Insufficient wallet balance"});

    }else if(amount < MINIMUM_WITHDRAWAL_AMOUNT){
        console.log(`Sorry the minimum withdrawal is ${MINIMUM_WITHDRAWAL_AMOUNT}`);
        res.status(500).json({error:`Sorry the minimum withdrawal is ${MINIMUM_WITHDRAWAL_AMOUNT}`});

        // If the sending and receiving wallets are of different currencies, do not send
    }else if(senderWallet.currency != receiverWallet.currency){
        console.log(`Sorry both wallets must be of the same currency`);
        res.status(500).json({error:`Sorry both wallets must be of the same currency`});
    }else{

        // Get User credentials (uid)
        var decodedClaims = verify(cookie['access-token'], 'jwtsecretplschange');
        let userId = decodedClaims['uid'];

        // STEP 1: subtract/decrement wallet balance
        await walletWithdrawal(walletId, amount);

        // STEP 2: Create Withdrawal data
        let withdraw = new Withdrawal(currency, walletId, receiverWallet.id, amount, desc, userId, user.uid);
        withdraw.received = false; // this is set to true if the receiver has gotten their funds
        await withdraw.createWithdrawal(withdraw);

        // STEP 3: Create Transaction data
        let transaction = new Transaction("internal-withdrawal", senderWallet.id, currency, desc, amount, user.uid, userId, receiverWallet.id, walletId);
        await transaction.createTransaction();

        // STEP 4: Add amount to the receiverWallet
        await walletDeposit(receiverWallet.id, amount);

        // await wallet.createWallet();
        res.json({msg:"Withdrawal successfully, funds will soon arrive at destination wallet"});
    
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
