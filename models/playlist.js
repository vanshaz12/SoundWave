const db = require('../db/db');

const Playlist = {
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
    }
};

module.exports = Playlist;