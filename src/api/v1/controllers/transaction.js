const { verify } = require("jsonwebtoken");
const { getTransactionHistory } = require("../models/transaction");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getUserTransactions = async (req, res) => {
    let cookie = req.cookies;

    // Get User credentials (uid)
    var decodedClaims = verify(cookie['access-token'], 'jwtsecretplschange');
    let userId = decodedClaims['uid'];

    let transactions = await getTransactionHistory(userId);
    res.json({transactions});

};


module.exports = {getUserTransactions};
