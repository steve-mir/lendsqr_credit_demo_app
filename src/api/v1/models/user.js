const db = require("../../../../config/db/knexfile");
class User {

  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  
}
const createUser = (obj) => db("Users").insert(obj);

module.exports = {User, createUser};