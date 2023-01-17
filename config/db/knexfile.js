const path = require('path');
// Update with your config settings.

const knex = {

  development: {
    client: 'sqlite3',
    connection: {
      filename:path.join(__dirname, 'db.sqlite3'),
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  }

};

// const knex = require("knex")({

//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: path.join(__dirname, 'db.sqlite3'),
//       host : process.env.DB_HOST,
//       user : process.env.DB_USER,
//       password : process.env.DB_PASS,
//       database : process.env.DB_NAME
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     },
//     useNullAsDefault: true
//   }

// });

module.exports = knex;