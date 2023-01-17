const knex = require('knex');

/**
 * @type {Knex}
 */
const database = knex({
    client: "sqlite3",
    connection: {
        filename: "./lendsqr_credit.sqlite",
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME
    },
    pool: {min: 0, max: 10},
    useNullAsDefault: true
  });
// database.migrate.latest();
module.exports = knex;