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

module.exports = router;