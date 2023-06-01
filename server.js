const express = require('express')
const logger = require('./middlewares/logger')
const sessions = require('./middlewares/session')



const playlistController = require('./controllers/playlist_controllers')
const usersController = require('./controllers/users_controller')


const app = express()
const port = process.env.PORT || 3001
app.listen(port, () => 
    console.log(`Server running on port http://localhost:${port}`))

// receieve request (from browser)
//     |
//     V
// middleware function to log request info in the terminal
app.use(logger)
//     |
//     V
// middleware to send back to SPA (single page application)
app.use(express.static('client'))
//     |
//     V
app.use(express.json())
//     |
//     V
// enable sessions
//     |
//     V
app.use(sessions)
app.use('/api/playlist', playlistController)
app.use('/api/users', usersController)
app.use('/api/sessions', sessionsController)


