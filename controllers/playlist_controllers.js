const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlist');

router.post('/', (req, res) => {
  const name = req.body.name
  const userId = req.session.userId

  Playlist
    .create(name, userId)
    .then(playlist => res.json(playlist))
})

router.get('/', (req, res) => {
  const userId = req.session.userId

  Playlist
    .read(userId)
    .then(playlists => res.json({ data: playlists }))
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

router.post('/add-song', (req, res) => {
  const playlistId = req.body.playlistId;
  const songName = req.body.songName;

  Playlist
    .create(playlistId, songName)
    .then(result => {
      res.json({ message: 'Song added successfully' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while adding the song' });
    });
});

module.exports = router;