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

  read: (playlistId) => {
    const sql = `
      SELECT *
      FROM playlists
      WHERE playlist_id = $1
    `;

    return db.query(sql, [playlistId])
      .then(dbRes => dbRes.rows[0]);
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

    addSong: (playlistId, songId) => {
      const sql = `
        INSERT INTO playlist_songs (playlist_id, song_id)
        VALUES ($1, $2)
      `;
    
      return db.query(sql, [playlistId, songId]);
    }    
};

module.exports = Playlist;