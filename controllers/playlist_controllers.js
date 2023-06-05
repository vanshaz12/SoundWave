const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlist');


router.post('/', (req, res) => {
  const { songName, artist, album } = req.body;
  const userId = req.session.userId; // Assuming the user identifier is stored in the session

  Playlist.create(songName, artist, album, userId)
    .then(playlist => {
      res.status(201).json(playlist);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});


// router.post('/', (req, res) => {
//   const { songName, artist, album } = req.body;

//   Playlist.create( songName, artist, album)
//     .then(playlist => {
//       res.status(201).json(playlist);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });


router.get('/', (req, res) => {
  const userId = req.session.userId; // Assuming the user identifier is stored in the session

  Playlist.readByUserId(userId) // Modify the database query to filter by user identifier
    .then(playlists => {
      res.json(playlists);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});


// router.get('/', (req, res) => {
//   Playlist.read()
//     .then(playlists => {
//       res.json(playlists);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

router.delete('/:id', (req, res) => {
  const playlistId = req.params.id;

  Playlist
    .delete(playlistId)
    .then(() => res.json({ message: 'Deleted successfully' }))
});

// router.get('/:id/listen', (req, res) => {
//   const playlistId = req.params.id;

//   Playlist
//     .findById(playlistId)
//     .then(playlist => {
//       // Implement the logic for playing the playlist here
//       // For example, you can retrieve the songs in the playlist and send them as a response

//       res.json({ data: playlist.songs });
//     })
//     .catch(error => {
//       console.error('Error occurred during playlist retrieval:', error);
//       res.status(500).json({ error: 'An error occurred during playlist retrieval' });
//     });
// });

module.exports = router;