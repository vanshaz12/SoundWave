const db = require('../db/db');

const Playlist = {
  create: (name, userId) => {
    const sql = `
      INSERT INTO playlists (name, user_id)
      VALUES ($1, $2)
      RETURNING *
    `;

    return db.query(sql, [name, userId])
      .then(dbRes => dbRes.rows[0]);
  },

  read: (userId) => {
    const sql = `
      SELECT *
      FROM playlists
      WHERE user_id = $1
    `;

    return db.query(sql, [userId])
      .then(dbRes => dbRes.rows);
  },

    update: (playlistId, name) => {
      const sql = `
        UPDATE playlists
        SET name = $1
        WHERE playlist_id = $2
        RETURNING *
      `;
  
      return db
        .query(sql, [name, playlistId])
        .then(dbRes => dbRes.rows[0]);
    },
  
    delete: (playlistId) => {
      const sql = 'DELETE FROM playlists WHERE playlist_id = $1';
  
      return db.query(sql, [playlistId]);
    },
    
};

module.exports = Playlist;