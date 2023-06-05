const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlist');

router.post('/', (req, res) => {
  const { songName, artist, album } = req.body;
  const userId = req.session.userId; 

  Playlist.create(songName, artist, album, userId)
    .then(playlist => {
      res.status(201).json(playlist);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.get('/', (req, res) => {
  const userId = req.session.userId; // Assuming the user identifier is stored in the session
  const query = req.query.q || ''; // Retrieve the search query parameter (if provided)

  Playlist.readByUserId(userId, query) // Pass the search query to the readByUserId function
    .then(playlists => {
      res.json(playlists);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});


router.delete('/:id', (req, res) => {
  const playlistId = req.params.id;

  Playlist.delete(playlistId)
    .then(() => res.json({ message: 'Deleted successfully' }))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
