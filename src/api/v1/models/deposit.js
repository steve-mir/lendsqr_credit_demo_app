const knexConfig = require("../../../../config/db/knexfile");
const knex = require('knex');
const db = knex(knexConfig.development);
const { v4: uuidv4 } = require('uuid');

class Deposit {

  constructor(currency, userId, amount, walletId) {
    this.id = uuidv4(); 
    this.currency = currency;
    this.userId = userId;
    this.amount = amount;
    this.walletId = walletId;
    this.date = new Date().toISOString();
  }

  async createDeposit() {
      return await db('deposits')
      .insert(this)
      .then(ids => ({ id: ids[0] }))
      .catch(function(e){ console.log(e)});
  }

}



function getDepositHistory(uid) {
    return db('deposits')
      .where({ userId: uid })
  }


module.exports = {Deposit, getDepositHistory};