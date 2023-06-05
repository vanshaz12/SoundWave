const db = require('../db/db');

const Playlist = {
  create: (songName, artist, album) => {
    const sql = `
      INSERT INTO playlists (song_name, artist, album)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    return db.query(sql, [songName, artist, album])
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

  update: (playlistId, songName, artist, album) => {
    const sql = `
      UPDATE playlists
      SET song_name = $1,
          artist = $2,
          album = $3
      WHERE playlist_id = $4
      RETURNING *
    `;

    return db.query(sql, [songName, artist, album, playlistId])
      .then(dbRes => dbRes.rows[0]);
  },

  delete: (playlistId) => {
    const sql = 'DELETE FROM playlists WHERE playlist_id = $1';

    return db.query(sql, [playlistId]);
  }
};

module.exports = Playlist;
