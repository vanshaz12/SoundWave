const pg = require('pg')

// change this to your actual production database connection string
const connectionString = process.env.DATABASE_URL;

const db = new pg.Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = db;

// change this to your actual local database name
// const localDbName = 'sound_wave'

// let db;
// if (process.env.DATABASE_URL) {
//   db = new pg.Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   })
// } else {
//   if (process.env.DEV_DB_PASSWORD) {
//     db = new pg.Pool({
//       database: localDbName,
//       password: process.env.DEV_DB_PASSWORD
//     })
//   } else {
//     db = new pg.Pool({
//       database: localDbName
//     })
//   }
// }

module.exports = db