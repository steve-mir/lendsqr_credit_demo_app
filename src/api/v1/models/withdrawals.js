const knexConfig = require("../../../../config/db/knexfile");
const knex = require('knex');
const db = knex(knexConfig.development);
const { v4: uuidv4 } = require('uuid');

class Withdrawal {

  constructor(currency, from_wallet, to_wallet, amount, note, sender_id, receiver_id) {
    this.id = uuidv4(); 
    this.currency = currency;
    this.from_wallet = from_wallet;
    this.to_wallet = to_wallet;
    this.amount = amount;
    this.note = note;
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.received = false;
    this.date = new Date().toISOString();
  }

  async createWithdrawal() {
      return await db('withdrawals')
      .insert(this)
      .then(ids => ({ id: ids[0] }))
      .catch(function(e){ console.log(e)});
  }

}



function getWithdrawalHistory(uid) {
    return db('withdrawals')
      .where({ sender_id: uid })
  }


module.exports = {Withdrawal, getWithdrawalHistory};