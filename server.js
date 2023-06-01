const express = require('express')
const logger = require('./middlewares/logger')
const sessions = require('./middlewares/session')



const playlistController = require('./controllers/playlist_controllers')
const usersController = require('./controllers/users_controller')

const app = express()
const port = process.env.PORT || 3001
app.listen(port, () => 
    console.log(`Server running on port http://localhost:${port}`))

app.use(logger)
app.use(express.static('client'))
app.use(express.json())
app.use






















app.use('/api/users', usersController)


