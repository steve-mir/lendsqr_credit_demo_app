const knexConfig = require("../../../../config/db/knexfile");
const knex = require('knex');
const db = knex(knexConfig.development);
const { v4: uuidv4 } = require('uuid');

class Wallet {

  constructor(type, currency, userId) {
    this.id = uuidv4(); 
    this.type = type;
    this.currency = currency;
    this.owner = userId;
    this.balance = 0;
    this.loanBalance = 0;
    this.created_at = new Date().toISOString();
  }
  

  async createWallet() {
      return await db('wallets')
      .insert(this)
      .then(ids => ({ id: ids[0] }))
      .catch(function(e){ console.log(e)});
    

  }

  update(id) {
    return db('wallets')
      .where('id', Number(id))
      .update(this);
  }

  remove(id) {
    return db('wallets')
      .where('id', Number(id))
      .del();
  }
  
}

/**
 * Deposit funds into wallet
 * @param {*} wallet_id 
 * @param {*} amount 
 * @returns 
 */
function walletDeposit(wallet_id, amount){
  return db('wallets')
    .where('id', wallet_id)
    .increment('balance', Number(amount))
    .catch(function(e){ console.log(e)});

}

/**
 * Wihdraw funds from wallet
 * @param {*} wallet_id 
 * @param {*} amount 
 * @returns 
 */
function walletWithdrawal(wallet_id, amount){
  return db('wallets')
    .where('id', wallet_id)
    .decrement('balance', Number(amount))
    .catch(function(e){ console.log(e)});

}

function getAllWallets(uid) {
    return db('wallets')
      .where({ owner: uid })
  }

function getWalletById(id) {
    return db('wallets')
      .where({ id: id })
      .first();
  }

function getUserWalletForCurrency(uid, currency) {
    return db('wallets')
      .where({ owner: uid })
      .andWhere({currency: currency})
      .catch(function(e){ console.log(e)});
  }


module.exports = {Wallet, getUserWalletForCurrency, getWalletById, getAllWallets, walletDeposit, walletWithdrawal};