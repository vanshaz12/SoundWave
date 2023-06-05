const db = require('../db/db');

const Playlist = {
  create: (songName, artist, album, userId) => {
    const sql = `
      INSERT INTO playlists (song_name, artist, album, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
  
    return db.query(sql, [songName, artist, album, userId])
      .then(dbRes => dbRes.rows[0]);
  },

  read: () => {
    const sql = `
      SELECT *
      FROM playlists
    `;

    return db.query(sql)
      .then(dbRes => dbRes.rows);
  },

  readByUserId: (userId, query) => {
    const sql = `
      SELECT *
      FROM playlists
      WHERE user_id = $1
        AND song_name ILIKE '%' || $2 || '%'
    `;
  
    return db.query(sql, [userId, query])
      .then(dbRes => dbRes.rows);
  },
  

  delete: (playlistId) => {
    const sql = 'DELETE FROM playlists WHERE playlist_id = $1';

    return db.query(sql, [playlistId]);
  }
};

module.exports = Playlist;
