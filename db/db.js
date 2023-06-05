const pg = require('pg')

// change this to your actual local database name
const localDbName = 'postgres://sound_wave_user:vmntkgLYWTFNlJN0fm3FXPniyvyHju3o@dpg-chsjc2ik728ud3jm5mug-a.oregon-postgres.render.com/sound_wave'

let db;
if (process.env.DATABASE_URL) {
  db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
} else {
  if (process.env.DEV_DB_PASSWORD) {
    db = new pg.Pool({
      database: localDbName,
      password: process.env.DEV_DB_PASSWORD
    })
  } else {
    db = new pg.Pool({
      database: localDbName
    })
  }
}

module.exports = db