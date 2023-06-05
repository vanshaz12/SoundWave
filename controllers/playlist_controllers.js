const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlist');

router.post('/', (req, res) => {
  const { songName, artist, album } = req.body;

  Playlist.create( songName, artist, album)
    .then(playlist => {
      res.status(201).json(playlist);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});



router.get('/', (req, res) => {
  Playlist.read()
    .then(playlists => {
      res.json(playlists);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.put('/:id', (req, res) => {
  const playlistId = req.params.id;
  const name = req.body.name;

  Playlist
    .update(playlistId, { name })
    .then(() => res.json({ message: 'Updated successfully' }))
});

router.delete('/:id', (req, res) => {
  const playlistId = req.params.id;

  Playlist
    .delete(playlistId)
    .then(() => res.json({ message: 'Deleted successfully' }))
});

router.get('/:id/listen', (req, res) => {
  const playlistId = req.params.id;

  Playlist
    .findById(playlistId)
    .then(playlist => {
      // Implement the logic for playing the playlist here
      // For example, you can retrieve the songs in the playlist and send them as a response

      res.json({ data: playlist.songs });
    })
    .catch(error => {
      console.error('Error occurred during playlist retrieval:', error);
      res.status(500).json({ error: 'An error occurred during playlist retrieval' });
    });
});

module.exports = router;