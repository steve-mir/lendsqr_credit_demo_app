const knexConfig = require("../../../../config/db/knexfile");
const knex = require('knex');
const db = knex(knexConfig.development);
const { v4: uuidv4 } = require('uuid');

class User {

  constructor(name, email, password) {
    this.uid = uuidv4(); 
    this.name = name;
    // this.username = username;
    // this.phone = phone;
    this.email = email;
    this.password = password;
    this.created_at = new Date().toISOString();
  }
  find() {
    return db('users');
  }

  findByUsername(username) {
    return db('users')
      .where({ username: username })
      .first();
  }

  findById(id) {
    return db('users')
      .where({ id: Number(id) })
      .first();
  }

  

  async insert() {
      return await db('users')
      .insert(this)
      // .onConflict('email')
      // .ignore()
      .then(ids => ({ id: ids[0] }))
      .catch(function(e){ console.log("Email already exists")});
    

  }

  update(id) {
    return db('users')
      .where('id', Number(id))
      .update(this);
  }

  remove(id) {
    return db('users')
      .where('id', Number(id))
      .del();
  }
  
}
function findByEmail(email) {
    return db('users')
      .where({ email: email})
      .first();
  }

module.exports = {User, findByEmail};