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

  updatedAt(){
    this.updated_at = new Date().toISOString();
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

  remove(id) {
    return db('users')
      .where('id', Number(id))
      .del();
  }
  
}
function getAllUsers() {
  return db('users')
  .catch(function(e){ console.log(e)});
}
  
function updateUser(user) {
    return db('users')
      .where({ uid: user.uid })
      .update(user)
      .catch(function(e){ console.log(e)});
  }

function findByEmail(email) {
    return db('users')
      .where({ email: email})
      .first();
  }

function getUserById(id) {
    return db('users')
      .where({ uid: id })
      .first()
      .catch(function(e){ console.log(e)});
  }

const getUser = async (id) => {
  return db('users')
      .where({ email: id })
      .orWhere({username: id})
      .catch(function(e){ console.log(e)});
}

module.exports = {User, getAllUsers, findByEmail, getUser, getUserById, updateUser};