const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlist');

router.post('/', (req, res) => {
  const name = req.body.name

  Playlist
      .create(name)
      .then(playlist => res.json(playlist))
})

router.get('/', (req, res) => {
  Playlist
      .read()
      .then(playlists => res.json({data:playlists}))
})

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

router.post('/add', (req, res) => {
  const { playlistId, songId } = req.body;

  // Add the song with the given songId to the playlist with the given playlistId
  // Perform the necessary database operations to add the song to the playlist

  res.json({ message: 'Song added to playlist successfully' });
});


module.exports = router;