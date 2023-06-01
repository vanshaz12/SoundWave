const express = require('express')
const router = express.Router()
const Playlist = require('../models/playlist')

router.post('/', (req, res) => {
    const name = req.body.name

    Playlist
        .create(name)
        .then(playlist => res.json(playlist))
})

router.get('/', (req, res) => {
    Playlist
        .read()
        .then(playlists => res.json(playlists))
})