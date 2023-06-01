const db = require('../db/db')

const User = {
  create: (name, email, passwordDigest) => {
    const sql = `
      INSERT INTO users(name, email, password_digest)
      VALUES ($1, $2, $3)
      RETURNING *
    `

    return db
      .query(sql, [name, email, passwordDigest])
      .then(dbRes => dbRes.rows[0].email)
  }
}

module.exports = User 
