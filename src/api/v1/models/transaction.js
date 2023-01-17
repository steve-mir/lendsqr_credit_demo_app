const knexConfig = require("../../../../config/db/knexfile");
const knex = require('knex');
const db = knex(knexConfig.development);
const { v4: uuidv4 } = require('uuid');

class Transaction {

  constructor(type, typeRef, currency, desc, amount, creditor, debtor, creditor_wallet, debtor_wallet) {
    this.id = uuidv4(); 
    this.type = type;
    this.typeRef = typeRef; // This is the reference id of the type of transaction. If deposit it holds the deposit id vice versa
    this.currency = currency;
    this.desc = desc;
    this.amount = amount;
    this.creditor_id = creditor;
    this.debtor_id = debtor;
    this.creditor_wallet = creditor_wallet;
    this.debtor_wallet = debtor_wallet;
    this.date = new Date().toISOString();
  }

  async createTransaction() {
      return await db('transactions')
      .insert(this)
      .then(ids => ({ id: ids[0] }))
      .catch(function(e){ console.log(e)});
  }
}



function getTransactionHistory(uid) {
    return db('transactions')
      .where({ debtor_id: uid })
      .orWhere({creditor_id: uid})
      .catch(function(e){ console.log(e)});
  }


module.exports = {Transaction, getTransactionHistory};